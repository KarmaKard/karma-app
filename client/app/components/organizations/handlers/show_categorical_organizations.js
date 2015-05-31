import React from 'react'
import { flux } from '../../../main'
import { Link } from 'react-router'

export default React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  renderOrganizationLink (organization, i) {
    return (
      <li className="organization_list-item" key={i}>
        <Link to="organization" params={{organizationId: organization.id}}>
          {organization.name}
        </Link>
      </li>
    )
  },

  render () {
    var category = this.context.router.getCurrentParams().category
    var organizationLinks = this.props.organizations
      .filter(org => org.category === category)
      .map(this.renderOrganizationLink)

    var currentUser = this.props.user
    var organizations = this.props.organizations


    if (!currentUser || organizations.length === 0 ){
      return <p>Wait!</p>
    }
    var manageLink
    this.props.organizations.map(function(organization){ 
       if (organization.userId === currentUser.id){
          return manageLink = <li><Link to="organizations_user_manages">Manage</Link></li>
       }
    })

    return (
      <div>
        <div className="page_header">
          <div className="page_header_title">{currentUser.first_name} </div>
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
            {manageLink}
          </ul>
        </div>
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


