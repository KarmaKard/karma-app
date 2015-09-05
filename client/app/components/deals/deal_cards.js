import React from 'react'
import { flux } from './../../main'
import { Link } from 'react-router'
import { formatDateString } from './../../utils/transforms'
import mui from 'material-ui'
import {CardTitle,  List, ListItem, TextField, RaisedButton, FlatButton, Card, FontIcon} from 'material-ui'

var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({
  propTypes: {
    donations: React.PropTypes.array.isRequired,
    user: React.PropTypes.object.isRequired,
    totalSaved: React.PropTypes.number.isRequired
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

  logOut () {
    var { router } = this.context
    flux.actions.users.logout(router)
  },

  donateAgain () {
    this.context.router.transitionTo('list_deals')
  },

  render () {
    var donations = this.props.donations
    var user = this.props.user
    var now = Date.now()
    var donationDate, expirationDate, oneCardExistsID
    var dealCardLinks = donations.map(function (donation) {
      donationDate = new Date(donation.createdAt)
      expirationDate = new Date(donation.createdAt)
      expirationDate = expirationDate.setFullYear(expirationDate.getFullYear() + 1)
      expirationDate = new Date(expirationDate)
      if (now < expirationDate && now > donationDate) {
        oneCardExistsID = donation.id
        return <ListItem primaryText={'Active Dates: ' + formatDateString(donationDate) + ' - ' + formatDateString(expirationDate)} />
      }
      return null
    })
    console.log('totally', this.props.totalSaved)
    return (
      <div>
        <List>
          {dealCardLinks}
        </List>
        <RaisedButton onClick={this.donateAgain} style={{minWidth:'96%',height:'36px', margin:'2%'}} fullWidth={true} label="Donate Again!" />
      </div>
    )
  }
})