import React from 'react'
import { flux } from '../../../main'
import { Link } from 'react-router'
import UserSideBar from '../../users/user_sidebar'

export default React.createClass({

  propTypes: {
    redemptions: React.PropTypes.array.isRequired,
    organization: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
    deals: React.PropTypes.array.isRequired,
    locations: React.PropTypes.array.isRequired,
    organizations: React.PropTypes.array.isRequired
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  logOut () {
    var { router } = this.context
    flux.actions.users.logout(router)
  },

  renderDealLink (deal, i) {
    var user = this.props.user
    var redemptions = this.props.redemptions
    var organization = this.props.organization
    var paymentId = this.context.router.getCurrentParams().paymentId
    var amountRedeemed = redemptions.filter(function (redemption) {
      return redemption.dealId === deal.id && redemption.userId === user.id ? redemption : null
    })

    var redemptionsLeft = deal.limit !== 'unlimited' ? deal.limit - amountRedeemed.length : deal.limit
    var redeemLink = redemptionsLeft === 0 ? 'add_redemptions' : 'survey'

    return (
      <Link to={redeemLink} params={{paymentId: paymentId, organizationId: organization.id, dealId: deal.id}}>
        <li className='deal-button' key={i}>
            <div className='deals_description'>{deal.dealText}</div>
            <div className='deals_limit'>{redemptionsLeft}</div>
        </li>
      </Link>
    )
  },

  render () {
    var user = this.props.user
    var deals = this.props.deals.map(this.renderDealLink)

    var locations = this.props.locations.map(function (location) {
      return <li className='dealButton'>{location.street + ' ' + location.zip}</li>
    })

    var organizations = this.props.organizations

    return (
      <div>
          <div className='page_header'>
          <div className='page_header_title'>{user.firstName} </div>
          <div className='page_header_link' onClick={this.logOut} >
            Log Out
          </div>
        </div>
        <UserSideBar organizations={organizations} user={user} />
        <div className='content_box'>
          <div className='organization_information' >
            <h1>{this.props.organization.name}</h1>
            <p>{this.props.organization.category}</p>
          </div>
          <div className='business_deals' >
            <div className='deals_header' >
              <h2 className='deals_description'>Deals</h2>
              <h2 className='deals_limit'>Limit</h2>
            </div>
            <ul className='deal_list'>
              {deals}
            </ul>
          </div>
          <div className='business_locations' >
          <h2>Locations</h2>
            <ul>
              {locations}
            </ul>
          </div>
        </div>
      </div>
    )
  }
})
