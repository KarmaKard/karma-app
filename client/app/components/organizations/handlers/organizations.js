import React from 'react'
import { flux } from '../../../main'
import { RouteHandler } from 'react-router'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState () {
    var storeState = this.getStoreState()
    if (storeState.organizationsStoreState.organizations.length === 0) {
      flux.actions.organizations.getOrganizations()
      flux.actions.organizations.getLocations()
    }
    if (storeState.dealsStoreState.deals.length === 0) {
      flux.actions.deals.getDeals()
      flux.actions.deals.getRedemptions
      flux.actions.deals.getSurveyResponses()
    }
    if (storeState.usersStoreState.payments.length === 0) {
      flux.actions.users.getPayments()
      flux.actions.users.getFundraiserMembers()
    }
    return storeState
  },

  componentDidMount () {
    var currentUser = this.state.usersStoreState.currentUser
    if (!currentUser) {
      var router = this.context.router
      router.transitionTo('login')
    }
  },

  storeChange () {
    this.setState(this.getStoreState())
  },

  getStoreState () {
    return {
      organizationsStoreState: flux.stores.organizations.getState(),
      usersStoreState: flux.stores.users.getState(),
      dealsStoreState: flux.stores.deals.getState(),
      showBackLink: false,
      toggleState: false
    }
  },

  componentWillMount () {
    flux.stores.organizations.addListener('change', this.storeChange)
    flux.stores.deals.addListener('change', this.storeChange)
    flux.stores.users.addListener('change', this.storeChange)
  },

  componentWillUnmount () {
    flux.stores.organizations.removeListener('change', this.storeChange)
    flux.stores.deals.removeListener('change', this.storeChange)
    flux.stores.users.removeListener('change', this.storeChange)
  },

  toggleMenu () {
    var toggleState = this.state.toggleState ? false : true
    this.setState({toggleState})
  },

  showBackLink (showBackLink) {
    this.setState({showBackLink})
  },

  goBack () {
    history.back()
  },

  render () {
    var organizations = this.state.organizationsStoreState.organizations
    var currentUser = this.state.usersStoreState.currentUser
    var payments = this.state.usersStoreState.payments
    var fundraiserMembers = this.state.usersStoreState.fundraiserMembers
    var deals = this.state.dealsStoreState.deals
    var locations = this.state.organizationsStoreState.locations
    var redemptions = this.state.dealsStoreState.redemptions
    var surveyQuestions = this.state.dealsStoreState.surveyQuestions
    var surveyResponses = this.state.dealsStoreState.surveyResponses
    if (!currentUser) {
      return <span>Authenticating...</span>
    }

    var backLink
    if (this.state.showBackLink) {
      backLink = (<div><button onClick={this.goBack} className='back_button'><i className='fa fa-chevron-left fa-2x'></i></button><div className='header_center karmatitle'>KarmaKard</div></div>)
    } else {
      backLink = (<div className='header_left karmatitle'>KarmaKard</div>)
    }

    return (
      <div>
        <div className='page_header'>
          {backLink}
          <button className='header_right disappear' onClick={this.toggleMenu}> ☰ </button>
        </div>

          <RouteHandler
            organizations={organizations}
            user={currentUser}
            locations={locations}
            deals={deals}
            redemptions={redemptions}
            surveyQuestions={surveyQuestions}
            surveyResponses={surveyResponses}
            payments={payments}
            fundraiserMembers={fundraiserMembers}
            showBackLink={this.showBackLink}
            toggleMenu={this.toggleMenu}
            toggleState={this.state.toggleState}/>
      </div>
    )
  }
})
