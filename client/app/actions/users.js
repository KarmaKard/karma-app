import { Actions } from 'minimal-flux'
import * as KarmaAPI from '../sources/karma_api'

export default class UserActions extends Actions {

  login (email, password, router, whereTo) {
    KarmaAPI.postLoginCredentials(email, password).then(user => {
      if (user) {
        this.dispatch('login', user)
        return router ? router.transitionTo(whereTo) : null

      }
      console.warn('No user returned from login')
    }).catch(this.loginError)
  }

  facebookLogin (user, router, whereTo) {
    KarmaAPI.postFacebookLoginCredentials(user).then(user => {
      if (user) {
        this.dispatch('facebookLogin', user)
        if (router) {
          return router.transitionTo(whereTo)
        }
      }
      console.warn('No user returned from login')
    }).catch(this.loginError)
  }

  loginError (error) {
    console.warn(error)
    this.dispatch('loginError', error)
  }

  clearLoginErrors () {
    this.dispatch('clearLoginErrors')
  }

  create (userData) {
    KarmaAPI.postNewUser(userData).then(user => {
      if (user) {
        this.dispatch('create', user)
      }else {
        console.warn('No user returned from create')
      }
    }).catch(this.createError)
  }

  update (user) {
    KarmaAPI.updateUser(user).then(user => {
      if (user) {
        this.dispatch('update', user)
      }
    })
  }

  createPayment (stripeToken, userData, router, whereTo, organizationId, fundraiserMemberId) {
    KarmaAPI.createPayment(stripeToken, userData, organizationId, fundraiserMemberId).then(response => {
      if (response) {
        this.dispatch('createPayment', response.payment, response.user, response.donation)
        return router.transitionTo(whereTo)
      }
    })
  }

  getPayments () {
    KarmaAPI.getPayments().then(payments => {
      if (payments) {
        this.dispatch('getPayments', payments)
      }
    })
  }

  getDonations () {
    KarmaAPI.getDonations().then(donations => {
      if (donations) {
        this.dispatch('getDonations', donations)
      }
    })
  }

  logout (router) {
    this.dispatch('logout', router)
  }

  emailPasswordReset (email) {
    KarmaAPI.emailPasswordReset(email).then(response => {
      if (response) {
        this.dispatch('emailPasswordReset', response)
      }
    }, function (err) {
      if (err) {
        this.dispatch('emailPasswordReset', false)
      }
    })
  }

  checkPasswordResetExpiration (passwordResetId) {
    KarmaAPI.checkPasswordResetExpiration(passwordResetId).then(response => {
      if (response) {
        this.dispatch('checkPasswordResetExpiration', response)
      }
    },
    this.dispatch('checkPasswordResetExpiration', false)
    )
  }

  saveNewPassword (router, passwordResetObject) {
    KarmaAPI.saveNewPassword(passwordResetObject).then(router.transitionTo('login'))
  }

  tieFundraiserMembershipToUser (user, fundraiserMemberId, router, whereTo) {
    var p = KarmaAPI.tieFundraiserMembershipToUser(user, fundraiserMemberId)
    p.then(response => {
      if (response) {
        this.dispatch('tieFundraiserMembershipToUser', response.user, response.fundraiserMember)
        return router ? router.transitionTo(whereTo) : null
      }
    }).catch(this.loginError)
  }

  getFundraiserMembers () {
    KarmaAPI.getFundraiserMembers().then(fundraiserMembers => {
      if (fundraiserMembers) {
        this.dispatch('getFundraiserMembers', fundraiserMembers)
      }
    }).catch(this.loginError)
  }

  createInPersonDonation (donation, fundraiserMember) {
    var p = KarmaAPI.createInPersonDonation(donation, fundraiserMember)
    p.then(response => {
      if (response) {
        this.dispatch('createInPersonDonation', response.fundraiserMember, response.donations, response.payment)
      }
    }).catch(this.createError)
  }

  activateDonation (user, donationId, router, whereTo) {
    var p = KarmaAPI.activateDonation(user, donationId)
    p.then(user => {
      if (user) {
        this.dispatch('activateDonation', user)
        return router ? router.transitionTo(whereTo) : null
      }
    }).catch(this.loginError)
  }

  createError (error) {
    console.warn(error)
    this.dispatch('createError', error)
  }
}
