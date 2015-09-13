import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { flux } from '../../main'
import mui from 'material-ui'
import {AppCanvas, AppBar, Tabs, Tab, FlatButton, FontIcon, UserSideBar, CardTitle, Card, CardMedia, CardHeader, TextField, List, ListItem, RaisedButton, CardText, FloatingActionButton} from 'material-ui'
var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({
  getInitialState () {
    return {
      amountSaved: null
    }
  },

  propTypes: {
    organization: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
    saveAmountSaved: React.PropTypes.func.isRequired
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },

  redeem () {
    var dealId = this.context.router.getCurrentParams().dealId
    var deal = this.props.deals.filter(deal => deal.id === dealId)[0]
    var today = new Date()
    var yearAgo = today.setYear(today.getFullYear() - 1)
    var donation = this.props.donations.filter(donation => donation.userId === this.props.user.id && donation.createdAt > yearAgo)[0]
    var amountSaved =(Math.round(deal.dollarValue * 100)/100)
    var redemption = {
      dealId: dealId,
      paymentId: this.context.router.getCurrentParams().paymentId,
      donationId: donation.id,
      organizationId: this.props.organization.id,
      userId: this.props.user.id,
      amountSaved
    }
    this.props.saveAmountSaved(amountSaved)

    var { router } = this.context
    flux.actions.deals.createRedemption(router, redemption)
  },

  renderLocationList (address, i) {
    return (
      <li>{address.street + ', ' + address.zip}</li>
    )
  },

  render() {
  injectTapEventPlugin()
    var user = this.props.user
    var redemptions = this.props.redemptions
    var organizationId = this.context.router.getCurrentParams().organizationId
    var dealId = this.context.router.getCurrentParams().dealId
    var organization = this.props.organizations.filter(organization => organization.id === organizationId)[0]
    var deal = this.props.deals.filter(deal => deal.id === dealId)[0]

    var amountRedeemed = redemptions.filter(function (redemption) {
      return redemption.dealId === deal.id && redemption.userId === user.id ? redemption : null
    })
    var redemptionsLeft = deal.limit !== 'unlimited' ? deal.totalLimit - amountRedeemed.length : deal.limit

    var locations = organization.locations
      .filter(address => address.organizationId === organization.id)
      .map(this.renderLocationList)
    return (
      <div>
        <CardTitle title="Cashier Confirmation" />
        <Card>
          <CardHeader
            title={organization.name}
            subtitle={organization.category}
            avatar={organization.logoURL}/>

          <CardText>Deal: {deal.dealText}</CardText>
          <CardText>Maximum Savings: {deal.dollarValue}</CardText>
          <CardText>
          Locations where valid:
          <ul style={{padding:'10px 0 0 20px'}}>{locations}</ul>
        </CardText>
        <CardText>{user.firstName} has {redemptionsLeft} redemptions remaining on this deal.</CardText>
         <RaisedButton style={{margin: '25px auto'}} label='Confirm Redemption' fullWidth={true} onClick={this.redeem} />
        </Card>
      </div>
      )
  }
})
