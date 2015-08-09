import React from 'react'
import { flux } from '../../main'
import Router from 'react-router'
import { Link } from 'react-router'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState () {
    var rateExperienceDiv = (
      <div>
          <h3>Rate your experience </h3>
          <div className='satisfaction_survey'>
            <li className='satisfaction_survey_item'><i onClick={this.recordExperience} value='satisfied' className='fa fa-smile-o fa-5x'></i></li>
            <li className='satisfaction_survey_item'><i onClick={this.recordExperience} value='dissatisfied' className='fa fa-frown-o fa-5x'></i></li>
          </div>
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
        <h1>You Just Saved $ {(Math.round(this.props.amountSaved * 100) / 100).toFixed(2)}!</h1>
          {this.state.rateExperienceDiv}
        <Link to="deals"><div className="karma_button">Go Back to Deal Card</div></Link>
      </div>
    )
  }
})