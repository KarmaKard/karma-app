import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { flux } from '../../main'
import Router from 'react-router'
import { Link } from 'react-router'
import mui from 'material-ui'
import {AppCanvas, AppBar, Tabs, Tab, FlatButton, FontIcon, UserSideBar, CardTitle, Card, CardMedia, CardHeader, TextField, List, ListItem, RaisedButton, CardText, FloatingActionButton} from 'material-ui'
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

  recordExperience(e){
    var surveyResponse = {
      userId: this.props.user.id,
      organizationId: this.props.organization.id,
      dealId: this.context.router.getCurrentParams().dealId,
      questionId: "ab4212a1-91e5-4b2e-96c1-a0e28b82d515",
      response: e.target.value,
      timestamp: new Date().getTime()
    }
    var { router } = this.context
    flux.actions.deals.createSurveyResponse(surveyResponse, router, 'deals')

  },

  render() {
    var dealId = this.context.router.getCurrentParams().dealId
    var deal = this.props.deals.filter(deal => deal.id === dealId)[0]
    var amountRedeemed = this.props.redemptions.filter(function (redemption) {
      return redemption.dealId === deal.id && redemption.userId === this.props.user.id ? redemption : null
    }.bind(this))
    var redemptionsLeft = deal.limit !== 'unlimited' ? deal.totalLimit - amountRedeemed.length : deal.limit
    var amountSaved =(Math.round(this.props.amountSaved * 100)/100).toFixed(2)
    return(
      <div>
        <CardTitle title={'You Just Saved $' + amountSaved + '!'} />
        <CardText>You now have {redemptionsLeft} redemptions remaining.</CardText>
        <CardText>Rate your experience </CardText>
        <div style={{width: '50%', float: 'left'}}>
        <FloatingActionButton style={{margin: '0 35%'}} value='satisfied' onClick={this.recordExperience}>
          <i className="material-icons md-48">mood</i>
        </FloatingActionButton>
        </div>
        <div style={{width: '50%', float: 'left'}}>
        <FloatingActionButton style={{margin: '0 35%'}} value='dissatisfied' onClick={this.recordExperience}>
          <i className="material-icons md-48">mood_bad</i>
        </FloatingActionButton>
        </div>
      </div>
    )
  }
})