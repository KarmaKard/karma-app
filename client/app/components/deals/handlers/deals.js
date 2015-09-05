import React from 'react'
import { RouteHandler } from 'react-router'
import mui from 'material-ui'
import {AppCanvas, AppBar, Tabs, Tab, FlatButton, FontIcon, UserSideBar, CardTitle, Card, CardMedia, CardHeader, TextField, List, ListItem, RaisedButton, CardText, FloatingActionButton} from 'material-ui'
var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  propTypes: {
    user: React.PropTypes.object.isRequired,
    organizations: React.PropTypes.array.isRequired,
    donations: React.PropTypes.array.isRequired,
    redemptions: React.PropTypes.array.isRequired,
    deals: React.PropTypes.array.isRequired
  },

  componentDidMount () {
    if (!this.props.user) {
      this.context.router.transitionTo('login')
    }
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },

  toAccount () {
    this.context.router.transitionTo('account')
  },

  toDeals () {
    this.context.router.transitionTo('deals')
  },

  render  () {
    var organizations = this.props.organizations
    var user = this.props.user
    var donations = this.props.donations
    var redemptions = this.props.redemptions.filter(redemption => redemption.userId === user.id)
    var orgWithQualifiedDeals = new Map()
    var cardCounter = 0
    var deals = this.props.deals.filter(deal => {
      var dealLimitCounter = 0
      donations.forEach(donation => {
        if (donation.userId === user.id) {
          var donationExpDate = parseInt(donation.createdAt, 10) + 31557600000
          // if payment hasn't expired
          if (donationExpDate > Date.now()) {
            cardCounter++
            // if active payment period is within active deal period
            if (donationExpDate < parseInt(deal.endDate, 10) /* && parseInt(deal.beginDate, 10) < payment.createdAt*/) {
              dealLimitCounter++
              orgWithQualifiedDeals.set(deal.organizationId, deal.organizationId)
            }
            // another reduce something to build a map of all deals with a key of dealId that
            // a beginning date less than the payment date and an expiration date greater than
            // the 1 year after payment date
          }
        }
      })
      if (dealLimitCounter !== 0) {
        if (deal.limit !== 'unlimited') {
          deal.totalLimit = deal.limit * dealLimitCounter
        }
      }
      return deal
    })

    if (cardCounter === 0) {
      return (
        <div>
        </div>
      )
    }

    var activeCategories = []
    var activeOrganizations = []
    var uniqueCategory = new Map()
    for (var i in organizations) {
      if (organizations[i].category !== 'undefined' &&
        organizations[i].category !== 'fundraiser' &&
        organizations[i].status === 'active' &&
        orgWithQualifiedDeals.has(organizations[i].id)) {
        activeOrganizations.push(organizations[i])
        if (!uniqueCategory.has(organizations[i].category)) {
          activeCategories.push(organizations[i].category)
          uniqueCategory.set(organizations[i].category, organizations[i].category)
        }
      }
    }
    console.log('surveyQuestions', this.props.surveyQuestions)
    return (
      <div>
        <Card className='main_card'>
          <RouteHandler
            {... this.props}
            organizations={activeOrganizations}
            categories={activeCategories}
            user={user}
            deals={deals}
            redemptions={redemptions}/>
        </Card>
        <div className='spacer'></div>
        <Tabs initialSelectedIndex={0} style={{bottom:-4, position: 'fixed', width: '100%'}}>
          <Tab onClick={this.toDeals} value='0' label=<i className="material-icons md-36">local_offer</i> ></Tab>
          <Tab onClick={this.toAccount} value='1' label=<i className="material-icons md-36">account_box</i> ></Tab>
        </Tabs>
      </div>
    )
  }
})
