import request from 'superagent'
import { tokenToUser } from '../utils/transforms'

const BASE_URL = process.env.API_HOST
const REGISTER_URL = BASE_URL + '/api/v1/users'
const LOGIN_URL = BASE_URL + '/api/v1/users/login'
const ORGANIZATIONS_URL = BASE_URL + '/api/v1/organizations'
const MANAGE_ORGANIZATIONS_URL = ORGANIZATIONS_URL + '/manage'
const DEALS_URL = BASE_URL + '/api/v1/deals'
const LOCATIONS_URL = BASE_URL + '/api/v1/locations'
const REDEMPTIONS_URL = BASE_URL + '/api/v1/redemptions'
const SURVEY_QUESTIONS_URL = BASE_URL + '/api/v1/questions'
const SURVEY_RESPONSES_URL = BASE_URL + '/api/v1/survey_responses'
const PAYMENT_URL = BASE_URL + '/api/v1/payments'
const FUNDRAISER_MEMBERS_URL = BASE_URL + '/api/v1/fundraiser_members'
const DONATION_URL = BASE_URL + '/api/v1/donations'

var token = window.localStorage.getItem('karma-token')
var affiliateToken = window.localStorage.getItem('affiliate-token')

function storeToken (t) {
  if (typeof localStorage === 'object') {
    try {
      window.localStorage.setItem('karma-token', t)
    } catch (e) {
      Storage.prototype._setItem = Storage.prototype.setItem
      Storage.prototype.setItem = function () {}
      alert('Your web browser does not support storing settings locally. In Safari, the most common cause of this is using "Private Browsing Mode". Some settings may not save or some features may not work properly for you.');
    }
  }
  token = t
}

export function postLoginCredentials (email, password) {
  email = email.toLowerCase()
  return new Promise((resolve, reject) => {
    request
      .post(LOGIN_URL)
      .send({email, password})
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        storeToken(res.body.token)
        resolve(tokenToUser(token))
      })
  })
}

export function postFacebookLoginCredentials (user) {
  return new Promise((resolve, reject) => {
    request
      .post(REGISTER_URL + '/facebook_login')
      .send({user})
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        storeToken(res.body.token)
        resolve(tokenToUser(token))
      })
  })
}

export function postNewUser (user) {
  user.email = user.email.toLowerCase()
  return new Promise((resolve, reject) => {
    request
      .post(REGISTER_URL)
      .send({user})
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        storeToken(res.body.token)
        resolve(tokenToUser(token))
      })
  })
}

export function updateUser (user) {
  return new Promise((resolve, reject) => {
    request
      .put(REGISTER_URL + '/update/' + user.id)
      .send({user})
      .set('token', token)
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        storeToken(res.body.token)
        resolve(tokenToUser(token))
      })
  })
}

export function createPayment (stripeToken, user, organizationId, fundraiserMemberId) {
  return new Promise((resolve, reject) => {
    request
      .post(PAYMENT_URL)
      .send({stripeToken, user, organizationId, fundraiserMemberId})
      .set('token', token)
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        storeToken(res.body.token)
        res.body.user = tokenToUser(token)
        resolve(res.body)
      })
  })
}

export function emailPasswordReset (email) {
  return new Promise((resolve, reject) => {
    request
      .post(REGISTER_URL + '/reset_password')
      .send({email})
      .end((err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res.status === 201)
      })
  })
}

export function checkPasswordResetExpiration (passwordResetId) {
  return new Promise((resolve, reject) => {
    request
      .post(REGISTER_URL + '/reset_password/check_expiration')
      .send({passwordResetId})
      .end((err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res.status === 201)
      })
  })
}

export function saveNewPassword (passwordResetObject) {
  return new Promise((resolve, reject) => {
    request
      .put(REGISTER_URL + '/reset_password')
      .send({passwordResetObject})
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res.status)
      })
  })
}

export function getPayments () {
  return new Promise((resolve, reject) => {
    request
      .get(PAYMENT_URL)
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res.body.payments)
      })
  })
}

export function getDonations () {
  return new Promise((resolve, reject) => {
    request
      .get(DONATION_URL)
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res.body.donations)
      })
  })
}

export function postNewOrganization (organization) {
  return new Promise((resolve, reject) => {
    request
      .post(ORGANIZATIONS_URL)
      .send({organization})
      .set('token', token)
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        console.log('response', res)
        storeToken(res.body.token)
        var response = {
          organization: res.body.organization,
          user: tokenToUser(token)
        }
        resolve(response)
      })
  })
}

export function getOrganizations () {
  return new Promise((resolve, reject) => {
    request
      .get(ORGANIZATIONS_URL)
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res.body.organizations)
      })
  })
}

export function getOrganization (id) {
  return new Promise((resolve, reject) => {
    request
      .get(ORGANIZATIONS_URL + '/' + id)
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res.body.organization)
      })
  })
}

export function updateOrganization (organization) {
  return new Promise((resolve, reject) => {
    request
      .put(ORGANIZATIONS_URL + '/' + organization.id)
      .send({organization})
      .set('token', token)
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res.body.organization)
      })
  })
}

export function getManagedOrganizations () {
  return new Promise((resolve, reject) => {
    request
      .get(MANAGE_ORGANIZATIONS_URL)
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res.body.organizations)
      })
  })
}

export function postDeals (deals) {
  return new Promise((resolve, reject) => {
    request
      .post(DEALS_URL)
      .send({deals})
      .set('token', token)
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res.body.deals)
      })
  })
}

export function updateDeals (deals) {
  return new Promise((resolve, reject) => {
    request
      .put(DEALS_URL)
      .send({deals})
      .set('token', token)
      .end((err, res) => {
        if (err) {
          return reject(err)
        }

        resolve(res.body.deals)
      })

  })
}

export function getDeals () {
  return new Promise((resolve, reject) => {
    request
      .get(DEALS_URL)
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res.body.deals)
      })
  })
}

export function saveLocation (location) {
  return new Promise((resolve, reject) => {
    request
      .post(ORGANIZATIONS_URL + '/location')
      .send({location})
      .set('token', token)
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res.body.organization)
      })
  })
}

export function deleteDeal (deal) {
  return new Promise((resolve, reject) => {
    request
      .del(DEALS_URL)
      .send({deal})
      .set('token', token)
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res.body.deal)
      })

  })
}

export function postNewRedemption (redemption) {
  return new Promise((resolve, reject) =>
    request
      .post(REDEMPTIONS_URL)
      .send({redemption})
      .set('token', token)
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res.body.redemption)
      })
  )
}

export function getRedemptions () {
  return new Promise((resolve, reject) => {
    request
      .get(REDEMPTIONS_URL)
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res.body.redemptions)
      })
  })
}

export function getSurveyQuestions () {
  return new Promise((resolve, reject) => {
    request
      .get(SURVEY_QUESTIONS_URL)
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res.body.questions)
      })
  })
}

export function postNewSurveyResponse (surveyResponse) {
  return new Promise((resolve, reject) => {
    request
      .post(SURVEY_RESPONSES_URL)
      .send({surveyResponse})
      .set('token', token)
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res.body.surveyResponse)
      })
  })
}

export function getSurveyResponses () {
  return new Promise((resolve, reject) => {
    request
      .get(SURVEY_RESPONSES_URL)
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res.body.surveyResponses)
      })
  })
}

export function createFundraiserMember (organization, newMember) {
  return new Promise((resolve, reject) => {
    request
      .post(FUNDRAISER_MEMBERS_URL)
      .send({organization, newMember})
      .set('token', token)
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res.body.fundraiserMember)
      })
  })
}

export function tieFundraiserMembershipToUser (user, fundraiserMemberId) {
  return new Promise((resolve, reject) => {
    request
      .put(FUNDRAISER_MEMBERS_URL)
      .send({user, fundraiserMemberId})
      .set('token', token)
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        storeToken(res.body.token)
        var response = {
          user: tokenToUser(token),
          fundraiserMember: res.body.fundraiserMember
        }
        resolve(response)
      })
  })
}

export function getFundraiserMembers () {
  return new Promise((resolve, reject) => {
    request
      .get(FUNDRAISER_MEMBERS_URL)
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res.body.fundraiserMembers)
      })
  })
}

export function createInPersonDonation (donation, fundraiserMember) {
  return new Promise((resolve, reject) => {
    request
      .post(DONATION_URL + '/inperson')
      .send({donation, fundraiserMember})
      .set('token', token)
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res.body)
      })
  })
}

export function shareCard (email, donation, user) {
  return new Promise((resolve, reject) => {
    request
      .put(DONATION_URL + '/share')
      .send({email, donation, user})
      .set('token', token)
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res.body.donation)
      })
  })
}

export function activateDonation (user, donationId) {
  return new Promise((resolve, reject) => {
    request
      .put(DONATION_URL)
      .send({user, donationId})
      .set('token', token)
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        console.log(res.body)
        storeToken(res.body.token)
        var response = {
          user: tokenToUser(token),
          donation: res.body.donation
        }
        resolve(response)
      })
  })
}

export function activatePayment (user, paymentId) {
  return new Promise((resolve, reject) => {
    request
      .put(PAYMENT_URL)
      .send({user, paymentId})
      .set('token', token)
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        console.log(res.body)
        storeToken(res.body.token)
        var response = {
          user: tokenToUser(token),
          payment: res.body.payment,
          donations: res.body.donations
        }
        resolve(response)
      })
  })
}

export function confirmFundraiser (organization, fundraiserMembers) {
  return new Promise((resolve, reject) => {
    request
      .put(ORGANIZATIONS_URL + '/confirm/' + organization.id)
      .send({organization, fundraiserMembers})
      .set('token', token)
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res.body.organization)
      })
  })
}

export function updateOwedAmounts (fundraiserPayment) {
  return new Promise((resolve, reject) => {
    request
      .put(FUNDRAISER_MEMBERS_URL + '/pay')
      .send({fundraiserPayment})
      .set('token', token)
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res.body.fundraiserMember)
      })
  })
}

