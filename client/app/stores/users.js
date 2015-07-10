import { Store } from 'minimal-flux'
import { tokenToUser } from '../utils/transforms'

export default class UserStore extends Store {

  constructor () {
    super()
    var token = window.localStorage.getItem('karma-token')

    this.state = {
      currentUser: token ? tokenToUser(token) : null,
      authenticated: token ? true : false,
      payments: [],
      createErrors: [],
      loginErrors: [],
      emailReturnCode: null,
      passwordResetCode: null
    }

    this.handleAction('users.login', this.handleAuth)
    this.handleAction('users.logout', this.logout)
    this.handleAction('users.create', this.handleAuth)
    this.handleAction('users.createError', this.storeCreateError)
    this.handleAction('users.loginError', this.storeLoginError)
    this.handleAction('users.clearLoginErrors', this.clearLoginErrors)
    this.handleAction('users.update', this.updateUser)
    this.handleAction('users.createPayment', this.createPayment)
    this.handleAction('organizations.create', this.createdOrganization)
    this.handleAction('users.getPayments', this.savePayments)
    this.handleAction('users.saveNewPassword', this.handleAuth)
    this.handleAction('users.emailPasswordReset', this.sendPasswordResetEmailCode)
    this.handleAction('users.checkPasswordResetExpiration', this.checkPasswordResetExpiration)
  }

  handleAuth (user) {
    this.setState({ currentUser: user, authenticated: true })
  }

  createdOrganization (organization, user) {
    this.setState({ currentUser: user, authenticated: true })
  }

  updateUser (user) {
    this.setState({ currentUser: user, authenticated: true })
  }

  createPayment (payment, user) {
    this.setState({
      user,
      payments: this.state.payments.concat(payment)
    })
  }

  savePayments (payments) {
    this.setState({payments})
  }

  logout () {
    this.setState({
      currentUser: null,
      authenticated: false
    })
    window.localStorage.clear()
  }

  storeCreateError (error) {
    this.setState({
      createErrors: this.state.createErrors.concat([error])
    })
  }

  storeLoginError (error) {
    this.setState({
      loginErrors: this.state.loginErrors.concat([error])
    })
  }

  sendPasswordResetEmailCode (code) {
    this.setState({
      emailReturnCode: code
    })
  }

  checkPasswordResetExpiration (code) {
    this.setState({
      passwordResetCode: code
    })
  }

  clearLoginErrors () {
    this.setState({
      loginErrors: []
    })
  }
}
