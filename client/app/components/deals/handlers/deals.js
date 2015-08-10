import React from 'react'
import { flux } from '../../../main'
import UserSideBar from '../../users/user_sidebar'
import { RouteHandler } from 'react-router'
import { Link } from 'react-router'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  logOut () {
    var { router } = this.context
    flux.actions.users.logout(router)
  },

  getInitialState () {
    var storeState = this.getStoreState()
    if (storeState.organizationsStoreState.organizations.length === 0) {
      flux.actions.organizations.getOrganizations()
      flux.actions.organizations.getLocations()
    }
    if (storeState.dealsStoreState.deals.length === 0) {
      flux.actions.deals.getDeals()
      flux.actions.deals.getRedemptions()
      flux.actions.deals.getSurveyQuestions()
      flux.actions.deals.getSurveyResponses()
    }
    if (storeState.usersStoreState.payments.length === 0) {
      flux.actions.users.getPayments()
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
      toggleState: false,
      showBackLink: false,
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

  render  () {
    var organizations = this.state.organizationsStoreState.organizations
    var user = this.state.usersStoreState.currentUser
    var payments = this.state.usersStoreState.payments
    var locations = this.state.organizationsStoreState.locations
    var surveyQuestions = this.state.dealsStoreState.surveyQuestions
    var surveyResponses = this.state.dealsStoreState.surveyResponses
    var redemptions = this.state.dealsStoreState.redemptions.filter(redemption => redemption.userId === user.id)
    var orgWithQualifiedDeals = new Map()

    var cardCounter = 0
    var deals = this.state.dealsStoreState.deals.filter(deal => {
      var dealLimitCounter = 0
      payments.forEach(payment => {
        if (payment.userId === user.id) {
          var paymentExpDate = parseInt(payment.createdAt, 10) + 31557600000
          // if payment hasn't expired
          if (paymentExpDate > Date.now()) {
            cardCounter++
            // if active payment period is within active deal period
            if (paymentExpDate < parseInt(deal.endDate, 10) /* && parseInt(deal.beginDate, 10) < payment.createdAt*/) {
              dealLimitCounter++
              orgWithQualifiedDeals.set(deal.organizationId, deal.organizationId)
            }
            // another reduce something to build a map of all deals with a key of dealId that
            // a beginning date less than the payment date and an expiration date greater than
            // the 1 year after payment date
          }
        }
      })
      if (dealLimitCounter !== 0) {
        if (deal.limit !== 'unlimited') {
          deal.totalLimit = deal.limit * dealLimitCounter
        }
      }
      return deal
    })

    var backLink
    if (this.state.showBackLink) {
      backLink = (<div><button onClick={this.goBack} className='back_button'><i className='fa fa-chevron-left fa-2x'></i></button><div className='header_center karmatitle'>KarmaKard</div></div>)
    } else {
      backLink = (<div className='header_left karmatitle'>KarmaKard</div>)
    }

    if (cardCounter === 0) {
      return (
        <div>
          <div className='page_header'>
            {backLink}
            <button className='header_right disappear' onClick={this.toggleMenu}> ☰ </button>
          </div>
          <div>
            <UserSideBar toggleState={this.state.toggleState} toggleMenu={this.toggleMenu} organizations={organizations} user={user} />
            <div className='content_box'>
              <h2>Donate now to start saving money with our deals!</h2>
              <Link to='list_deals'>
                <div className='karma_button'>Add a Card!</div>
              </Link>
            </div>
          </div>
        </div>
      )
    }

    var activeCategories = []
    var activeOrganizations = []
    var uniqueCategory = new Map()
    for (var i in organizations) {
      if (organizations[i].category !== 'undefined' &&
        organizations[i].category !== 'fundraiser' &&
        organizations[i].status === 'active' &&
        orgWithQualifiedDeals.has(organizations[i].id)) {
        activeOrganizations.push(organizations[i])
        if (!uniqueCategory.has(organizations[i].category)) {
          activeCategories.push(organizations[i].category)
          uniqueCategory.set(organizations[i].category, organizations[i].category)
        }
      }
    }

    return (
      <div>
        <div className='page_header'>
          {backLink}
          <button className='header_right disappear' onClick={this.toggleMenu}> ☰ </button>
        </div>
        <div>
          <UserSideBar toggleState={this.state.toggleState} toggleMenu={this.toggleMenu} organizations={organizations} user={user} />
          <div className='content_box'>
            <RouteHandler
              organizations={activeOrganizations}
              categories={activeCategories}
              user={user}
              locations={locations}
              deals={deals}
              redemptions={redemptions}
              surveyQuestions={surveyQuestions}
              surveyResponses={surveyResponses}
              showBackLink={this.showBackLink}/>
          </div>
        </div>
      </div>
    )
  }
})
