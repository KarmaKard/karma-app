import React from 'react'
import { flux } from '../../../main'
import { Link } from 'react-router'

export default React.createClass({

  propTypes: {
    user: React.PropTypes.object.isRequired,
    deals: React.PropTypes.array.isRequired,
    organizations: React.PropTypes.array.isRequired,
    categories: React.PropTypes.array.isRequired,
    showBackLink: React.PropTypes.func.isRequired
  },

  defaultProps: {
    organizations: []
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  componentWillMount () {
    this.props.showBackLink(false)
  },

  logOut () {
    var { router } = this.context
    flux.actions.users.logout(router)
  },

  renderOrganizationLink (organization, i) {
    if (organization.status !== 'active') { return }
    return (
      <Link to='business' params={{organizationId: organization.id}}>
        <li className='list-item' key={i}>
          {organization.name}
        </li>
      </Link>
    )
  },

  render () {
    var user = this.props.user
    var organizations = this.props.organizations

    var activeCategories = this.props.categories.map((category, index) => {
      var organizationLinks = organizations
        .filter(organization =>
        organization.category === category)
        .map(this.renderOrganizationLink)

      return (
        <div>
        <Link to='categorical_organizations' params={{category: category}}>
          <li className='list-header' key={index}>
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
          <div className='content_box-header'>
            Wow! We Dont Have Any Businesses
          </div>
          <p>Have a business that to offer deal with us?</p>
          <p><Link to='create_organization'>Sign Up Here!</Link></p>
        </div>
      )
    }

    var addNewLink = null

    return (
      <div>
        <div className='content_box-header'>
          Deal Categories
        </div>
        <ul>
          {activeCategories}
        </ul>
        {addNewLink}
      </div>
    )
  }
})
