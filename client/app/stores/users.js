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
      userLocation: {},
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
    this.handleAction('users.tieFundraiserMembershipToUser', this.handleFundraiserMemberAuth)
    this.handleAction('users.getFundraiserMembers', this.saveFundraiserMembers)
    this.handleAction('organizations.createFundraiserMember', this.saveFundraiserMember)
    this.handleAction('users.createInPersonDonation', this.saveDonation)
    this.handleAction('users.activateDonation', this.activateDonation)
    this.handleAction('users.activatePayment', this.activatePayment)
    this.handleAction('users.getUserLocation', this.saveLocation)
    this.handleAction('users.shareCard', this.saveSharedDonation)
    this.handleAction('organizations.updateOwedAmounts', this.updateFundraiserMember)
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
    localStorage.clear()
    this.setState({
      currentUser: null,
      authenticated: false
    })
    
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

  updateFundraiserMember (fundraiserMember) {
    var fundraiserMembers = this.state.fundraiserMembers
    for (var i = 0; i < fundraiserMembers.length; i++) {
      if (fundraiserMembers[i].id === fundraiserMember.id) {
        fundraiserMembers[i] = fundraiserMember
      }
    }
    this.setState({fundraiserMembers})
  }

  saveFundraiserMembers (fundraiserMembers) {
    this.setState({fundraiserMembers})
  }

  saveDonations (donations) {
    this.setState({donations})
  }

  saveDonation (returnedFundraiserMember, newValueDonations, payment) {
    var fundraiserMembers = this.state.fundraiserMembers
    var index = fundraiserMembers.findIndex(arrayFundraiserMember => arrayFundraiserMember.id === returnedFundraiserMember.id)
    fundraiserMembers[index] = returnedFundraiserMember
    this.setState({
      fundraiserMembers: fundraiserMembers,
      donations: this.state.donations.concat(newValueDonations),
      payments: this.state.payments.concat(payment)
    })
  }

  saveSharedDonation (donation) {
    var donations = this.state.donations
    for (var i = 0; i < donations.length; i++) {
      if (donations[i].id === donation.id) {
        donations[i] = donation
      }
    }
    this.setState({donations})
  }

  saveFundraiserMember (fundraiserMember) {
    this.setState({
      fundraiserMembers: this.state.fundraiserMembers.concat(fundraiserMember)
    })
  }

  handleFundraiserMemberAuth (user, fundraiserMember) {
    var fundraiserMembers = this.state.fundraiserMembers
    for (var i = 0; i < fundraiserMembers.length; i++) {
      if (fundraiserMembers[i].id === fundraiserMember.id) {
        fundraiserMembers[i] = fundraiserMember
      }
    }

    this.setState({ currentUser: user, authenticated: true, fundraiserMembers})
  }

  activatePayment (user, payment, donations) {
    console.log('trying to activate', user, payment, donations)
    var donationsMap = new Map()
    for (var i = 0; i < donations.length; i++) {
      donationsMap.set([donations[i].id], donations[i])
    } 
        console.log(donationsMap)
    var stateDonations = this.state.donations
    for (var i = 0; i < stateDonations.length; i++) {
      if (donationsMap.has(stateDonations[i].id)) {
        stateDonations[i] = donationsMap.get(stateDonations[i])
      }
    }

    var payments = this.state.payments
    for (var i = 0; i < payments.length; i++) {
      if (payments[i].id === payment.id) {
        payments[i] = payment
      }
    }
    this.setState({
      currentUser: user,
      authenticated: true,
      donations: donations,
      payments: payments
    })
  }

  activateDonation (user, donation) {
    var donations = this.state.donations
    for (var i = 0; i < donations.length; i++) {
      if (donations[i].id === donation.id) {
        donations[i] = donation
      }
    }
    this.setState({
      currentUser: user,
      authenticated: true,
      donations
    })
  }

  saveLocation (locationObject) {
    this.setState({
      userLocation: locationObject
    })
    
  }

  clearLoginErrors () {
    this.setState({
      loginErrors: []
    })
  }
}
