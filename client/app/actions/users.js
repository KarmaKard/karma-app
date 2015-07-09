import { Actions } from 'minimal-flux'
import * as KarmaAPI from '../sources/karma_api'

export default class UserActions extends Actions {

  login(router, email, password) {
    KarmaAPI.postLoginCredentials(email, password).then(user => {
      if (user) {
        this.dispatch('login', user)
        return router.transitionTo('organizations')
      }
      console.warn('No user returned from login')
    }).catch(this.loginError)
  }

  loginError(error) {
    console.warn(error)
    this.dispatch('loginError', error)
  }

  clearLoginErrors() {
    this.dispatch('clearLoginErrors')
  }

  create(userData) {
    KarmaAPI.postNewUser(userData).then(user => {
      if (user) {
        this.dispatch('create', user)
      }
      else{
        console.warn('No user returned from create')
      }
    }).catch(this.createError)
  }

  update(user) {
    KarmaAPI.updateUser(user).then(user => {
      if (user) {
        this.dispatch('update', user)
      }
    })
  }

  createPayment(stripeToken, userData) {
    KarmaAPI.createPayment(stripeToken, userData).then(response => {
      if (response) {
        this.dispatch('createPayment', response.payment, response.user)
      }
    })
  }

  getPayments(){
    KarmaAPI.getPayments().then(payments => {
      if(payments) {
        this.dispatch('getPayments', payments)
      }
    })
  }

  logout(router) {
    this.dispatch('logout')
    return router.transitionTo('login')
  }

  createError(error) {
    console.warn(error)
    this.dispatch('createError', error)
  }
}
