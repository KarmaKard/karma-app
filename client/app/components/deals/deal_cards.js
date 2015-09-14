import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import DealCardInfo from './deal_card_info'
import { flux } from './../../main'
import { Link } from 'react-router'
import { formatDateString } from './../../utils/transforms'
import mui from 'material-ui'
import {CardTitle,  List, ListItem, TextField, Avatar, RaisedButton, FlatButton, Card, CardText, CardHeader, FontIcon} from 'material-ui'

var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({
  propTypes: {
    donations: React.PropTypes.array.isRequired,
    user: React.PropTypes.object.isRequired,
    totalSaved: React.PropTypes.number.isRequired
  },

  getInitialState () {
    return {
      showShare: null
    }
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

  render() {
  injectTapEventPlugin()
    var donations = this.props.donations
    var user = this.props.user
    var now = Date.now()
    var donationDate, expirationDate, oneCardExistsID
    var cardCounter = 0
    var dealCardLinks = donations
      .filter(donation => donation.userId === user.id)
      .map(function (donation) {
        donationDate = new Date(donation.createdAt)
        expirationDate = new Date(donation.createdAt)
        expirationDate = expirationDate.setFullYear(expirationDate.getFullYear() + 1)
        expirationDate = new Date(expirationDate)
        if (now < expirationDate && now > donationDate) {
          cardCounter++
          oneCardExistsID = donation.id
          var organization = this.props.organizations.filter(organization => organization.id === donation.fundraiserId)[0]
          var redemptions = this.props.redemptions.filter(redemption => redemption.donationId === donation.id)
          var amountsSaved = redemptions.map(redemption => {return redemption.amountSaved})
          var savedAmount = 0

          if(amountsSaved.length > 0) {
            savedAmount = amountsSaved.reduce(function(previousValue, currentValue, index, array) {
              return previousValue + currentValue
            })
          }
          return (
            <DealCardInfo 
              donationDate={donationDate} 
              expirationDate={expirationDate} 
              organization={organization}
              cardCounter={cardCounter}
              redemptions={redemptions}
              savedAmount={savedAmount}
              donation={donation}
              user={user}/>
          )
        }
        return null
      }.bind(this))
    return (
      <div>
        {dealCardLinks}
        <RaisedButton className='raisedButton' primary={true} onClick={this.donateAgain} style={{minWidth:'96%',height:'36px', margin:'2%'}} fullWidth={true} label="Donate Again!" />
      </div>
    )
  }
})