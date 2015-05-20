import React from 'react'
import { flux } from '../../../main'
import Router, {RouteHandler, Link} from 'react-router'



export default React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState() {
    return Object.assign(this.getStoreState(),{
    })
  },

  storeChange() {
    this.setState(this.getStoreState())
  },

  getStoreState() {
    if(flux.stores.organizations.getState().organizations.length === 0){
      flux.actions.organizations.getOrganizations()
      return {
        organizations: [],
        user: {}
      }
    }
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
    if (!this.state.user.currentUser){
      return <p>Wait!</p>
    }

    return (
      <div>
        <div className="page_header">
          <div className="page_header_title">{this.state.user.currentUser.first_name}</div>
          <div className="page_header_link">
            <Link to="login">
              Log Out
            </Link>
          </div>
        </div>
        <div className="side_bar_navigation">
          <ul className="side_bar_navigation_level1">
            <li><Link to="user">Account</Link></li>
            <li><Link to="user_organizations">Organizations</Link></li>
          </ul>
        </div>
        <div className="content_box">
            <RouteHandler organizations={this.state.organizations} user={this.state.user}/>
        </div>
      </div>
    )
  }
})