import React from 'react'
import { flux } from '../../../main'
import { RouteHandler, Link } from 'react-router'

export default React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState() {
    var storeState = this.getStoreState()
    if(storeState.organizations.organizations.length === 0){
      flux.actions.organizations.getOrganizations()
    }
    return storeState
  },

  storeChange() {
    this.setState(this.getStoreState())
  },

  getStoreState() {
    return {
      organizations: flux.stores.organizations.getState(),
      user: flux.stores.users.getState()
    }
  },

  componentWillMount() {
    flux.stores.organizations.addListener('change', this.storeChange)
  },

  componentWillUnmount() {
    flux.stores.organizations.removeListener('change', this.storeChange)
  },

  render() {
    var currentUser = this.state.user.currentUser
    var organizations = this.state.organizations.organizations

    if (!currentUser){
      return <p>Authenticating...</p>
    }

    var isManager = !!organizations.find(org => org.userId === currentUser.id)

    return (
      <div>
        <div className="page_header">
          <div className="page_header_title">{currentUser.firstName}</div>
          <div className="page_header_link">
            <Link to="root">
              Log Out
            </Link>
          </div>
        </div>
        <div className="side_bar_navigation">
          <ul className="side_bar_navigation_level1">
            <li><Link to="account">Account</Link></li>
            <li><Link to="categories">Deals</Link></li>
            {isManager ? <li><Link to="organizations_user_manages">Manage</Link></li> : null}
          </ul>
        </div>
        <div className="content_box">
          <RouteHandler user={currentUser} />
        </div>
      </div>
    )
  }
})
