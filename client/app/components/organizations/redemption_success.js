import React from 'react'
import { flux } from '../../main'
import Router from 'react-router'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState(){
    var rateExperienceDiv = (
      <div className="rateExperience">
          <p>Rate your experience </p>
          <ul>
            <li><button onClick={this.recordExperience} className="redeem_success-happy_button" value="satisfied">:)</button></li>
            <li><button onClick={this.recordExperience} className="redeem_success-unhappy_button" value="dissatisfied">:(</button></li>
          </ul>
          <p>Or</p>
        </div>

    )
    return {
      rateExperienceDiv
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
    flux.actions.deals.createSurveyResponse(surveyResponse)
    this.setState({rateExperienceDiv: ""})

  },

  render() {
    return(
      <div>
        <p>You Just Saved $ {this.props.amountSaved}!</p>
          {this.state.rateExperienceDiv}
        <p>Share this same deal to friends and they will get to use it no strings attached!</p>
      </div>
    )
  }
})