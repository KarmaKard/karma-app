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

var token = window.localStorage.getItem('karma-token')

function storeToken (t) {
  window.localStorage.setItem('karma-token', t)
  token = t
}

export function postLoginCredentials (email, password) {
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

export function postNewUser (user) {
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
      .put(REGISTER_URL + '/' + user.id)
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

export function createPayment (stripeToken, user) {
  return new Promise((resolve, reject) => {
    request
      .post(PAYMENT_URL)
      .send({stripeToken, user})
      .set('token', token)
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res.body)
      })
  })
}

export function emailPasswordReset (email) {
  console.log('in karmaapi', email)
  return new Promise((resolve, reject) => {
    request
      .post(REGISTER_URL + '/reset_password')
      .send({email})
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
      })
  })
}

export function getPayments () {
  return new Promise((resolve, reject) => {
    request
      .get(PAYMENT_URL)
      .set('token', token)
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res.body.payments)
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
      .set('token', token)
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
      .set('token', token)
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
      .set('token', token)
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res.body.organizations)
      })
  })
}

export function postDeals (deals) {
  return new Promise ((resolve, reject) => {
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
  return new Promise ((resolve, reject) => {
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
  return new Promise ((resolve, reject) => {
    request
      .post(LOCATIONS_URL)
      .send({location})
      .set('token', token)
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res.body.location)
      })
  })
}

export function getLocations () {
  return new Promise((resolve, reject) => {
    request
      .get(LOCATIONS_URL)
      .set('token', token)
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res.body.locations)
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
  return new Promise ((resolve, reject) =>
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
      .set('token', token)
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
      .set('token', token)
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
      .set('token', token)
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res.body.surveyResponses)
      })
  })
}
