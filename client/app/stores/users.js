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
      donations: [],
      fundraiserMembers: [],
      createErrors: [],
      loginErrors: [],
      resetEmailSent: null,
      expired: null
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
    this.handleAction('users.getDonations', this.saveDonations)
    this.handleAction('users.emailPasswordReset', this.sendPasswordResetEmail)
    this.handleAction('users.checkPasswordResetExpiration', this.checkPasswordResetExpiration)
    this.handleAction('users.facebookLogin', this.handleAuth)
    this.handleAction('users.tieFundraiserMembershipToUser', this.handleAuth)
    this.handleAction('users.getFundraiserMembers', this.saveFundraiserMembers)
    this.handleAction('organizations.createFundraiserMember', this.saveFundraiserMember)
    this.handleAction('users.createInPersonDonation', this.saveDonation)
    this.handleAction('users.activateDonation', this.handleAuth)
    this.handleAction('organizations.updateOwedAmounts', this.saveFundraiserMembers)
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

  createPayment (payment, user, donation) {
    this.setState({
      user,
      payments: this.state.payments.concat(payment),
      donations: this.state.donations.concat(donation)
    })
  }

  savePayments (payments) {
    this.setState({payments})
  }

  logout (router) {
    window.localStorage.clear()
    this.setState({
      currentUser: null,
      authenticated: false
    })
    router.transitionTo('login')
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

  sendPasswordResetEmail (sentBoolean) {
    this.setState({
      resetEmailSent: sentBoolean
    })
  }

  checkPasswordResetExpiration (linkActiveBoolean) {
    this.setState({
      resetLinkActive: linkActiveBoolean
    })
  }

  saveFundraiserMembers (fundraiserMembers) {
    this.setState({fundraiserMembers})
  }

  saveDonations (donations) {
    this.setState({donations})
  }

  saveDonation (fundraiserMember, donations, payment) {
    var index = this.state.fundraiserMembers.findIndex(arrayFundraiserMember => arrayFundraiserMember.id === fundraiserMember.id)
    var updatedFundraiserMembers = this.state.fundraiserMembers[index] = fundraiserMember
    this.setState({
      fundraiserMembers: updatedFundraiserMembers,
      donations: this.state.donations.concat(donations),
      payments: this.state.payments.concat(payment)
    })
  }

  saveFundraiserMember (fundraiserMember) {
    this.setState({
      fundraiserMembers: this.state.fundraiserMembers.concat(fundraiserMember)
    })
  }

  clearLoginErrors () {
    this.setState({
      loginErrors: []
    })
  }
}
