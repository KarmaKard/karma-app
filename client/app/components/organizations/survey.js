import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { flux } from '../../main'
import { Link } from 'react-router'
import mui from 'material-ui'
import {AppCanvas, AppBar, Tabs, Tab, FlatButton, FontIcon, UserSideBar, CardTitle, Card, CardMedia, CardHeader, TextField, List, ListItem, RaisedButton, CardText, FloatingActionButton} from 'material-ui'
var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({

  propTypes: {
    user: React.PropTypes.object.isRequired,
    organization: React.PropTypes.object.isRequired,
    surveyQuestion: React.PropTypes.object.isRequired
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  saveResponse (e) {
    var surveyResponse = {
      userId: this.props.user.id,
      organizationId: this.props.organization.id,
      questionId: this.props.surveyQuestion.id,
      dealId: this.context.router.getCurrentParams().dealId,
      response: e.target.value,
      timestamp: new Date().getTime()
    }

    flux.actions.deals.createSurveyResponse(surveyResponse)

    var { router } = this.context
    router.transitionTo('redeem_deal', {paymentId: this.context.router.getCurrentParams().paymentId, organizationId: surveyResponse.organizationId, dealId: surveyResponse.dealId})
  },

  renderAnswerLink (option, i) {
    return <RaisedButton style={{margin: '25px 0'}} label={option} fullWidth={true} onClick={this.saveResponse} value={option}/>
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },

  render() {
  injectTapEventPlugin()
    if (!this.props.surveyQuestion) {
      return (
      <div className='surveyQuestion' >
        <h1>Whoa</h1>
        <div>
          Looks like we dont have any new questions in our database!
          <p><Link to='redeem_deal' params={{paymentId: this.context.router.getCurrentParams().paymentId, organizationId: this.context.router.getCurrentParams().organizationId, dealId: this.context.router.getCurrentParams().dealId}}>Click Here to redeem anyways</Link></p>
        </div>
      </div>
      )
    }
    var options = this.props.surveyQuestion.options.map(this.renderAnswerLink)
    var questionText = this.props.surveyQuestion.text

    return (
      <div>
        <CardTitle title="Are You Sure?" />
        <CardText>Before you hand your phone to the cashier, confirm your redemption by answering the following:</CardText>
        <CardTitle title=<span style={{fontSize: "24px", color: "rgb(66, 66, 66)"}}>{questionText}</span> />
          {options}
      </div>
    )
  }
})
