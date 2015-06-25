import React from 'react'
import { flux } from '../../../main'
import { RouteHandler } from 'react-router'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState() {
    var storeState = this.getStoreState()
    if (storeState.organizationsStoreState.organizations.length === 0){
      flux.actions.organizations.getOrganizations()
      flux.actions.organizations.getLocations()
    }
    if (storeState.dealsStoreState.deals.length === 0){
      flux.actions.deals.getDeals()
      flux.actions.deals.getRedemptions()
      flux.actions.deals.getSurveyQuestions()
      flux.actions.deals.getSurveyResponses()
    }
    return storeState
  },

  componentDidMount(){
    var currentUser = this.state.usersStoreState.currentUser
    if (!currentUser){
      var router = this.context.router
      router.transitionTo('login')
    }
  },

  storeChange() {
    this.setState(this.getStoreState())
  },

  getStoreState() {
    return {
      organizationsStoreState: flux.stores.organizations.getState(),
      usersStoreState: flux.stores.users.getState(),
      dealsStoreState: flux.stores.deals.getState()
    }
  },

  componentWillMount() {
    flux.stores.organizations.addListener('change', this.storeChange)
    flux.stores.deals.addListener('change', this.storeChange)
  },

  componentWillUnmount() {
    flux.stores.organizations.removeListener('change', this.storeChange)
    flux.stores.deals.removeListener('change', this.storeChange)
  },


  render() {
    var organizations = this.state.organizationsStoreState.organizations
    var currentUser = this.state.usersStoreState.currentUser
    var deals = this.state.dealsStoreState.deals
    var locations = this.state.organizationsStoreState.locations
    var redemptions = this.state.dealsStoreState.redemptions
    var surveyQuestions = this.state.dealsStoreState.surveyQuestions
    var surveyResponses = this.state.dealsStoreState.surveyResponses

    if (!currentUser) {
      return <span>Authenticating...</span>
    }

    return (
      <div>
        <RouteHandler 
          organizations={organizations} 
          user={currentUser} 
          locations={locations} 
          deals={deals} 
          redemptions={redemptions} 
          surveyQuestions={surveyQuestions} 
          surveyResponses={surveyResponses}/>
      </div>
    )
  }
})
