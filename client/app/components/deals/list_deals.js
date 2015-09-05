import React from 'react'
import { flux } from '../../main'
import { Link } from 'react-router'
import mui from 'material-ui'
import { CardTitle, CardText, RaisedButton, List, ListItem, Avatar} from 'material-ui'

var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },

  generateDealList () {
    var dealsByOrganization = this.props.dealsByOrganization
    var dealsList = dealsByOrganization.map(function (organization, t) {
      var deals = organization.deals.map(function (deal, i) {
            var savings
            if (deal.limit === 'unlimited') {
              savings = 'unlimited'
            } else {
              savings = (parseInt(deal.limit, 10) * parseFloat(deal.dollarValue)).toFixed(2)
            }
            return (
              <ListItem
                primaryText={deal.dealText}
                secondaryText={'Maximum Value Per Use: ' + savings}
                rightToggle=<p>Limit {deal.limit}</p> />
            )
          })
      var logo = organization.logoURL ? <Avatar style={{height: '40px', width: '40px', padding: 0}} src={organization.logoURL} /> : <i className="material-icons">photo</i>
      return (
        <ListItem
          primaryText={organization.name}
          initiallyOpen={true}
          leftIcon={logo}
          nestedItems={[   
            {deals}
          ]}/>

      )
    })

    return dealsList
  },

  render () {
    if (!this.props.dealsByOrganization) {return <p>Waiting...</p>}
    var totalSavings = this.props.totalSavings
    var dealsList = this.generateDealList()

    var affiliateToken = window.localStorage.getItem('affiliate-token')
    var fundraiserLink = affiliateToken
      ? <Link to = 'fundraiser_join' params={{fundraiserMemberId: affiliateToken}}><RaisedButton fullWidth={true} style={{margin:'10px 0 0 0'}} label='Donate' /></Link>
      : <Link to = 'fundraisers'><RaisedButton fullWidth={true} style={{margin:'10px 0 0 0'}} label='Donate to a local Fundraiser' /></Link>

    return (
      <div>
        <CardText>Every month businesses offer deals with a specified limit. Although many of the deals will remain the same month to month, you will also see new businesses and updated deal offerings every month. This means, that every month you get a refresh of an ever growing list of deals! No more expiration dates!</CardText>
        <List>
          {dealsList}
        </List>
        <hr/>
        <CardTitle title='Get Your Karma!'/>
        <CardText>Give good, Get good. In order to have full access to KarmaKard, we ask that you give to a local fundraising organization. A $30 dollar donation will give you instant access to thousands of dollars in exclusive deals.</CardText>
        {fundraiserLink}
      </div>
    )
  }
})
