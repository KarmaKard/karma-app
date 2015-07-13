import React from 'react'
import { flux } from '../../../main'
import { Link } from 'react-router'
import UserSideBar from '../../users/user_sidebar'

export default React.createClass({

  propTypes: {
    user: React.PropTypes.object.isRequired,
    payment: React.PropTypes.object.isRequired,
    deals: React.PropTypes.array.isRequired,
    organizations: React.PropTypes.array.isRequired,
    categories: React.PropTypes.array.isRequired
  },

  defaultProps: {
    organizations: []
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  logOut () {
    var { router } = this.context
    flux.actions.users.logout(router)
  },

  renderOrganizationLink (organization, i) {
    if (organization.status !== 'active') { return }
    return (
      <Link to='business' params={{paymentId: this.context.router.getCurrentParams().paymentId, organizationId: organization.id}}>
        <li className='organization_list-item' key={i}>
          {organization.name}
        </li>
      </Link>
    )
  },

  render () {
    var user = this.props.user
    var payment = this.props.payment
    var organizations = this.props.organizations

    var activeCategories = this.props.categories.map((category, index) => {
      var organizationLinks = organizations
        .filter(organization =>
        organization.category === category)
        .map(this.renderOrganizationLink)

      return (
        <div>
        <Link to='categorical_organizations' params={{paymentId: payment.id, category: category}}>
          <li className='category_list-item' key={index}>
            {category}
          </li>
        </Link>
        {organizationLinks}
        </div>
      )
    })

    if (activeCategories.length === 0) {
      return (
        <div>
          <div className='page_header'>
              <div className='page_header_title'>{user.firstName}</div>
              <div className='page_header_link' onClick={this.logOut}>
                Log Out
              </div>
            </div>
            <UserSideBar organizations={organizations} user={user} />
          <div className='content_box'>
            <div className='content_box-header'>
              Wow! We Dont Have Any Businesses
            </div>
            <p>Have a business that to offer deal with us?</p>
            <p><Link to='create_organization'>Sign Up Here!</Link></p>
          </div>
        </div>
      )
    }

    var addNewLink = null

    if (!user.roles.manager && !user.roles.superadmin) {
      addNewLink = (
        <div>
          <hr />
          <Link to='new_organization' className='create_organization-link'>
            Business? Fundraiser?
            <span className='create_organization-link_span'>Offer deals with us!</span>
          </Link>
        </div>
      )
    }

    return (
      <div>
         <div className='page_header'>
            <div className='page_header_title'>{user.firstName}</div>
            <div className='page_header_link' onClick={this.logOut}>
              Log Out
            </div>
          </div>
          <UserSideBar organizations={organizations} user={user} />
          <div className='content_box'>
            <div className='content_box-header'>
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
