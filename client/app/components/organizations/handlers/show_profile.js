import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { flux } from '../../../main'
import { Link } from 'react-router'

export default React.createClass({

  propTypes: {
    redemptions: React.PropTypes.array.isRequired,
    organization: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
    deals: React.PropTypes.array.isRequired,
    organizations: React.PropTypes.array.isRequired,
    showBackLink: React.PropTypes.func.isRequired
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  logOut () {
    var { router } = this.context
    flux.actions.users.logout(router)
  },

  componentWillMount () {
    this.props.showBackLink(true)
  },

  renderDealLink (deal, i) {
    var user = this.props.user
    var redemptions = this.props.redemptions
    var organization = this.props.organization
    var amountRedeemed = redemptions.filter(function (redemption) {
      return redemption.dealId === deal.id && redemption.userId === user.id ? redemption : null
    })

    var redemptionsLeft = deal.limit !== 'unlimited' ? deal.totalLimit - amountRedeemed.length : deal.limit
    var redeemLink = redemptionsLeft > 0 ? 'survey' : 'add_redemptions'

    return (
      <Link to={redeemLink} params={{organizationId: organization.id, dealId: deal.id}}>
        <li className='deal-button' key={i}>
            <div className='deals_description'>{deal.dealText}</div>
            <div className='deals_limit'>{redemptionsLeft}</div>
        </li>
      </Link>
    )
  },

  render() {
  injectTapEventPlugin()
    var organization = this.props.organization
    if (!organization) {
      return (
        <div>
          <h1>This is embarrassing, but...</h1>
          <p>We couldn&#39;t find this organization!</p>
        </div>
      )
    }

    var deals = this.props.deals.map(this.renderDealLink)
    var locations = organization.locations.map(function (location) {
      return <li className='dealButton'>{location.street + ' ' + location.zip}</li>
    })

    return (
      <div>
        <div className='organization_information' >
          <div className="content_box-header">{organization.name}</div>
          <p>{organization.category}</p>
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
    )
  }
})
