import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { RouteHandler } from 'react-router'
import mui from 'material-ui'
import LoginForm from '../../users/login_form'
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
    deals: React.PropTypes.array.isRequired,
    userLocation: React.PropTypes.object.isRequired
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
  
  setFbLogin (user) {
    flux.actions.users.facebookLogin(user)
  },

  userLogin (email, password) {
    flux.actions.users.login(email, password)
  },

  createUser (user) {
    flux.actions.users.create(user)
  },

  sortByDistance (a, b) {
    return a.distance - b.distance
  },

  getDistance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;

    return 12742 * Math.asin(Math.sqrt(a)) * 0.621371; // 2 * R; R = 6371 km
  },

  sortByLocation (organizations, latitude, longitude) {
    var orgsWithDistances = []
    for (var i = 0; i < organizations.length; i++) {
      var distance = 0
      var leastDistance = 100000000
      for (var t = 0; t < organizations[i].locations.length; t++) {
        var orgLat = organizations[i].locations[t].latitude
        var orgLng = organizations[i].locations[t].longitude
        distance = this.getDistance(latitude, longitude, orgLat, orgLng)
        leastDistance = distance < leastDistance ? distance : leastDistance
      }
      organizations[i].distance = leastDistance
      orgsWithDistances.push(organizations[i])
    }
    return orgsWithDistances.sort(this.sortByDistance)
  },

  render  () {
    injectTapEventPlugin()
    var user = this.props.user
    if (!user) {
      return  (<div>
                <Card className='main_card'>
                  <LoginForm setFbLogin={this.setFbLogin} userLogin={this.userLogin} />
                </Card>
              </div>
              ) 
    }
    var businesses = this.props.organizations.filter(organization => organization.type === 'business')
    var organizations = this.props.userLocation.latitude && this.props.userLocation.longitude
        ? this.sortByLocation(businesses, this.props.userLocation.latitude, this.props.userLocation.longitude) 
        : businesses
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
        } else {
          if (Date.now() < (parseInt(deal.endDate) - 31557600000))
          orgWithQualifiedDeals.set(deal.organizationId, deal.organizationId)
        }
      })

      if (deal.limit !== 'unlimited') {
        deal.totalLimit = deal.limit * dealLimitCounter
      }

      return deal
    })

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

    var form =  <RouteHandler
                  {... this.props}
                  organizations={activeOrganizations}
                  categories={activeCategories}
                  user={user}
                  deals={deals}
                  redemptions={redemptions}/>
    return (
      <div>
        <Card className='main_card'>
        {form}
        </Card>
        <div className='spacer'></div>
        <Tabs className='bottomTabs' initialSelectedIndex={0} style={{bottom:-4, position: 'fixed', width: '100%'}}>
          <Tab onClick={this.toDeals} style={{color: 'rgb(255, 112, 112)', backgroundColor: '#313131 !important', borderTop: '2px #FF7070 solid'}} value='0' label=<i className="material-icons md-36">local_offer</i> ></Tab>
          <Tab onClick={this.toAccount} value='1' label=<i className="material-icons md-36">account_box</i> ></Tab>
        </Tabs>
      </div>
    )
  }
})
