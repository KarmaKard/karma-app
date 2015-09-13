import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { RouteHandler } from 'react-router'
import mui from 'material-ui'
import DealList from '../list_deals'
import { Link } from 'react-router'
import {AppCanvas, AppBar, Tabs, Tab, FlatButton, FontIcon, UserSideBar, CardTitle, Card, CardMedia, CardHeader, TextField, List, ListItem, RaisedButton, CardText, FloatingActionButton} from 'material-ui'
var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  propTypes: {
    organizations: React.PropTypes.array.isRequired,
    donations: React.PropTypes.array.isRequired,
    deals: React.PropTypes.array.isRequired,
    userLocation: React.PropTypes.object.isRequired
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
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
    var businesses = this.props.organizations.filter(organization => organization.type === 'business')
    var organizations = this.props.userLocation.latitude && this.props.userLocation.longitude
        ? this.sortByLocation(businesses, this.props.userLocation.latitude, this.props.userLocation.longitude) 
        : businesses
    var donations = this.props.donations
    var orgWithQualifiedDeals = new Map()
    var cardCounter = 0
    var deals = this.props.deals.filter(deal => {
      var dealLimitCounter = 0
      donations.forEach(donation => {
        Date.now() < (parseInt(deal.endDate, 10) - 31557600000)
        orgWithQualifiedDeals.set(deal.organizationId, deal.organizationId)
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

    var fundraiserNameToken = window.localStorage.getItem('fundraiser-token')
    var memberNameToken = window.localStorage.getItem('member-token')
    var fundraiserLink 

    if (fundraiserNameToken && memberNameToken) {
      fundraiserLink = <Link to = 'fundraiser_join' params={{fundraiserName: fundraiserNameToken, fundraiserMemberName: memberNameToken}}><RaisedButton fullWidth={true} style={{margin:'10px 0 0 0'}} label='Donate' /></Link>
    } else if (fundraiserNameToken && !memberNameToken) {
      fundraiserLink = <Link to = 'fundraiser_join' params={{fundraiserName: fundraiserNameToken}}><RaisedButton fullWidth={true} style={{margin:'10px 0 0 0'}} label='Donate' /></Link>
    } else {
      fundraiserLink = <Link to = 'fundraisers'><RaisedButton fullWidth={true} style={{margin:'10px 0 0 0'}} label='Donate to a local Fundraiser' /></Link>
    }

    var form = <DealList {... this.props}
                  organizations={activeOrganizations}
                  categories={activeCategories}
                  deals={deals} />
    return (
      <Card className='main_card'>
        <CardTitle title='KarmaKard'/>
        {fundraiserLink}
        {form}
        {fundraiserLink}
      </Card>
    )
  }
})

