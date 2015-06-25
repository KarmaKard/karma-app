import React from 'react'
import { flux } from '../../../main'
import UserSideBar from '../../users/user_sidebar'
import { Link } from 'react-router'

export default React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  logOut(){
    var { router } = this.context
    flux.actions.users.logout(router)
  },

  renderOrganizationLink (organization, i) {
    if(organization.status !== "active"){ return }
    return (
      <li className="organization_list-item" key={i}>
        <Link to="organization" params={{organizationId: organization.id}}>
          {organization.name}
        </Link>
      </li>
    )
  },

  render () {
    var user = this.props.user
    var organizations = this.props.organizations
    var category = this.context.router.getCurrentParams().category

    var organizationLinks = organizations
      .filter(org => org.category === category)
      .map(this.renderOrganizationLink)

    if (!user || organizations.length === 0 ){
      return <p>Wait!</p>
    }

    return (
      <div>
        <div className="page_header">
          <div className="page_header_title">{user.firstName} </div>
          <div className="page_header_link" onClick={this.logOut}>
            Log Out
          </div>
        </div>
        <UserSideBar organizations={organizations} user={user} />
        <div className="content_box">
          <div className="content_box-header">{category + " "} Businesses </div>
          <ul>
            {organizationLinks}
          </ul>
        </div>
      </div>
    )
  }
})


