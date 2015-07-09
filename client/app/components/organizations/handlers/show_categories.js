import React from 'react'
import { flux } from '../../../main'
import { Link } from 'react-router'
import UserSideBar from '../../users/user_sidebar'

export default React.createClass({

  defaultProps: {
    organizations: []
  },

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
      <Link to="business" params={{paymentId: this.context.router.getCurrentParams().paymentId, organizationId: organization.id}}>
        <li className="organization_list-item" key={i}>
          {organization.name}
        </li>
      </Link>
    )
  },
  
  render(){
    if(!this.props.user || !this.props.payment){return <span>Hello</span>}
    var user = this.props.user
    var paymentId = this.context.router.getCurrentParams().paymentId
    var payment = this.props.payment
    var deals = this.props.deals
    var organizations = this.props.organizations

    var activeCategories = this.props.categories.map((category, index) => {
      var organizationLinks = organizations
        .filter(organization => 
        organization.category === category)
        .map(this.renderOrganizationLink)

      return (
        <div>
        <Link to="categorical_organizations" params={{paymentId: payment.id, category : category}}>
          <li className="category_list-item" key={index}>
            {category}
          </li>
        </Link>
        {organizationLinks}
        </div>
      )
    })

    var addNewLink=null

    if(!user.roles.manager && !user.roles.superadmin){
      addNewLink = (
        <div>
          <hr />
          <Link to="new_organization" className="create_organization-link">
            Business? Fundraiser? 
            <span className="create_organization-link_span">Offer deals with us!</span>
          </Link>
        </div>
      )
    }

    return (
      <div>
         <div className="page_header">
            <div className="page_header_title">{user.firstName}</div>
            <div className="page_header_link" onClick={this.logOut}>
              Log Out
            </div>
          </div>
          <UserSideBar organizations={organizations} user={user} />
          <div className="content_box">
            <div className="content_box-header">
              Deal Categories
            </div>
            <ul>
              {activeCategories}
            </ul>
            {addNewLink}
          </div>
        </div>
    )
  }
})
