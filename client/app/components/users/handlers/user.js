import React from 'react'
import { flux } from '../../../main'
import { RouteHandler, Link } from 'react-router'
import UserSideBar from '../user_sidebar'

export default React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  logOut(){
    var { router } = this.context
    flux.actions.users.logout(router)
  },

  getInitialState() {
    var storeState = this.getStoreState()
    if (storeState.organizations.organizations.length === 0){
      flux.actions.organizations.getOrganizations()
      flux.actions.organizations.getLocations()
      flux.actions.deals.getRedemptions()
      flux.actions.deals.getDeals()
    }
    return storeState
  },

  componentDidMount(){
    var currentUser = this.state.user.currentUser
    if (!currentUser){
      var router = this.context.router
      router.transitionTo('login')
    }
  },

  storeChange() {
    this.setState(this.getStoreState)
  },

  getStoreState() {
    return {
      organizations: flux.stores.organizations.getState(),
      user: flux.stores.users.getState(),
      deals: flux.stores.deals.getState()
    }
  },

  componentWillMount() {
    flux.stores.organizations.addListener('change', this.storeChange)
    flux.stores.users.addListener('change', this.storeChange)
  },

  componentWillUnmount() {
    flux.stores.organizations.removeListener('change', this.storeChange)
    flux.stores.users.removeListener('change', this.storeChange)
  },

  render() {
    var currentUser = this.state.user.currentUser
    var organizations = this.state.organizations.organizations || []
    var redemptions = this.state.deals.redemptions
    var totalSaved = redemptions.reduce( function(a, b){
      if (b["userId"] === currentUser.id){
          return a + parseFloat(b["amountSaved"])
      }
      return a
    }, 0)

    if (!currentUser){
      return <p>Authenticating...</p>
    }

    return (
      <div>
        <div className="page_header">
          <div className="page_header_title">{currentUser.firstName}</div>
          <div className="page_header_link" onClick={this.logOut}>
            Log Out
          </div>
        </div>
        <UserSideBar organizations={organizations} user={currentUser} />
        <div className="content_box">
          <RouteHandler user={currentUser} totalSaved={totalSaved}/>
        </div>
      </div>
    )
  }
})
