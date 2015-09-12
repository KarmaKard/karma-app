import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import NonAdminManageOrganizations from '../organizations/nonadmin_organizations_manager'
import DealCards from '../deals/deal_cards'
import MemberFundraisers from '../organizations/member_fundraisers'
import {flux} from '../../main'
import { Link } from 'react-router'
import mui from 'material-ui'
import dealCardPicture from '../../../assets/img/piggy-bank.png'
import organizationsPicture from '../../../assets/img/business-building.png'
import {CardTitle, CardMedia, TextField, RaisedButton, List, CardHeader, Avatar, FlatButton, Card, FontIcon} from 'material-ui'

var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({

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

  propTypes: {
    user: React.PropTypes.object.isRequired,
    totalSaved: React.PropTypes.number.isRequired,
    organizations: React.PropTypes.array.isRequired,
    donations: React.PropTypes.array.isRequired,
    fundraiserMembers: React.PropTypes.array.isRequired
  },

  componentWillMount () {
    console.log(this.props)
    if(this.props.showBackLink) {
      this.props.showBackLink(false)
    }
  },

  componentDidMount () {
    (function (d, s, id) {
      var js
      var fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) return
      js = d.createElement(s)
      js.id = id
      js.src = '//connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))
  },

  fbAsyncInit () {
    FB.init({
      appId: '550843868397495',
      cookie: true,
      xfbml: true,
      version: 'v2.4'
    })
   FB.getLoginStatus(this.handleSessionResponse)
  },

  handleSessionResponse (response) {
    if (response.status !== 'connected') {
      var {router} = this.context
      flux.actions.users.logout(router)
    }
    FB.logout(this.handleSessionResponse)
  },

  logOut () {
    if (!this.props.user.fbUserId) {
      var {router} = this.context
      flux.actions.users.logout(router)
    }

    this.fbAsyncInit()
  },

  render() {
  injectTapEventPlugin()
    var organizations = this.props.organizations
    var user = this.props.user
    var donations = this.props.donations.filter(donation => donation.userId === user.id && donation.activationStatus === 'active')
    var membershipMap = new Map()
    console.log('user_account', this.props.fundraiserMembers, user.id)
    var fundraiserMembers = this.props.fundraiserMembers
      .filter(fundraiserMembership => {
        if (fundraiserMembership.userId === user.id) {
          membershipMap.set(fundraiserMembership.organizationId, fundraiserMembership)
          return fundraiserMembership
        }
      })
    var memberFundraisers = organizations.filter(organization => {
      if (membershipMap.has(organization.id)) {
        return organization
      }
    })
    
    return (
      <div>
        <CardTitle title='Account'/>
        <Card style={{margin: '15px auto'}}>
        <CardMedia className='overlay_title' overlay={<div style={{margin: '0 0 8px 8px', fontSize: '36px', color: '#FF7070', display: 'block', lineHeight: '36px'}}> Your Deal Cards</div>}>
          <img src={dealCardPicture} />
        </CardMedia>
          <CardTitle
            style={{margin: '0 0 0 10px', fontSize:'16px', padding:'10px 0 !important'}}
            subtitle={'Total Savings Value: $' + this.props.totalSaved}/>
          <DealCards {... this.props} donations={donations} user={user} totalSaved={this.props.totalSaved} />
        </Card>
        <Card style={{margin: '15px auto'}}>
        <CardMedia className='overlay_title' overlay={<div style={{margin: '0 0 8px 8px', fontSize: '36px', color: '#FF7070', display: 'block', lineHeight: '36px'}}> Your Organizations</div>}>
          <img src={organizationsPicture} />
        </CardMedia>
          <NonAdminManageOrganizations organizations={organizations} user={user} />
        </Card>

        <MemberFundraisers user={user} memberFundraisers={memberFundraisers} fundraiserMembers={fundraiserMembers} />
        <RaisedButton style={{margin: '20px 0 0 0'}} fullWidth={true} onClick={this.logOut} label="Log Out" />
      </div>
    )
  }
})
