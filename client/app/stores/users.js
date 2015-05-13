import { Store } from 'minimal-flux'
import { tokenToUser } from '../utils/transforms'

export default class UserStore extends Store {

  constructor() {
    super()
    var token = window.localStorage.getItem('karma-token')
    this.state = {
      currentUser: token ? tokenToUser(token) : null,
      authenticated: token ? true : false,
      createErrors: [],
      loginErrors: []
    }
    this.handleAction('users.login', this.handleAuth)
    this.handleAction('users.create', this.handleAuth)
    this.handleAction('users.createError', this.storeCreateError)
    this.handleAction('users.loginError', this.storeLoginError)
    this.handleAction('users.clearLoginErrors', this.clearLoginErrors)
  }

  handleAuth(user) {
    this.setState({ currentUser: user, authenticated: true })
  }

  storeCreateError(error) {
    this.setState({
      createErrors: this.state.createErrors.concat([error])
    })
  }

  storeLoginError(error) {
    this.setState({
      loginErrors: this.state.loginErrors.concat([error])
    })
  }

  clearLoginErrors() {
    this.setState({
      loginErrors: [],
    })
  }
}