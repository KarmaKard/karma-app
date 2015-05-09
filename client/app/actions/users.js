import { Actions } from 'minimal-flux'
import * as KarmaAPI from '../sources/karma_api'

export default class UserActions extends Actions {

  login(router, email, password) {
    KarmaAPI.postLoginCredentials(email, password).then(user => {
      if (user) {
        this.dispatch('login', user)
        return router.transitionTo('user_dashboard')
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

  create(router, userData) {
    KarmaAPI.postNewUser(userData).then(user => {
      if (user) {
        this.dispatch('create', user)
        return router.transitionTo('user_dashboard')
      }
      console.warn('No user returned from create')
    }).catch(this.createError)
  }

  createError(error) {
    console.warn(error)
    this.dispatch('createError', error)
  }
}
