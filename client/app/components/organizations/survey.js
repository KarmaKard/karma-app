import React from 'react'
import { flux } from '../../main'
import { Link } from 'react-router'

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
    return <li key={i}><button className='karma_button' value={option} onClick={this.saveResponse}>{option}</button></li>
  },

  render () {
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
      <div className='surveyQuestion' >
        <h1>{questionText}</h1>
        <ul>
          {options}
        </ul>
      </div>
    )
  }
})
