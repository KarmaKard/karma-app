import React from 'react'
import { flux } from '../../main'
import Router from 'react-router'
import { Link } from 'react-router'

export default React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState() {
    return {
      userId: null,
      surveyResponses: [],
      surveyQuestion: {}
    }
  },

  componentWillMount(){
    var userId = this.props.user.id
    var surveyResponses = this.props.surveyResponses.filter(function(response){
      if(response.userId === userId){return response}
    })
    var surveyQuestion = this.findNewQuestion(surveyResponses)
    
    this.setState({
      userId,
      surveyResponses,
      surveyQuestion
    })

  },
  
  saveResponse(e){
    var surveyResponse = {
      userId: this.props.user.id,
      organizationId: this.props.organization.id,
      questionId: this.state.surveyQuestion.id,
      dealId: this.context.router.getCurrentParams().dealId,
      response: e.target.value,
      timestamp: new Date().getTime()
    }

    flux.actions.deals.createSurveyResponse(surveyResponse)

    var { router } = this.context
    router.transitionTo('redeem_deal', {paymentId: this.context.router.getCurrentParams().paymentId, organizationId: surveyResponse.organizationId, dealId: surveyResponse.dealId})
  },

  renderAnswerLink (option, i) {
    return <li key={i}><button className="karma_button" value={option} onClick={this.saveResponse}>{option}</button></li>
  },

  findNewQuestion(surveyResponses){
    var responseObject = {}
    surveyResponses.forEach(function(response){
      responseObject[response.questionId] = response
    })
    for(var i = 0; i < this.props.surveyQuestions.length; i++){
      if (!(this.props.surveyQuestions[i].id in responseObject)) {
        return this.props.surveyQuestions[i]
      }
    }
  },

  render() {
    if(this.props.surveyQuestions.length === 0 ){return <span>Wait</span>}

    var options, questionText
    if(this.state.surveyQuestion){
      options = this.state.surveyQuestion.options.map(this.renderAnswerLink)
      questionText = this.state.surveyQuestion.questionText
    }
    
    var organization = this.props.organization
    var dealId = this.context.router.getCurrentParams().dealId
    var paymentId = this.context.router.getCurrentParams().paymentId

    return(
      <div className="surveyQuestion" >
        <Link to="business" params={{paymentId: paymentId, organizationId: organization.id, dealId: dealId}}>
          <button className="back_button">Go Back</button>
        </Link>

        <h1>{questionText}</h1>
        <ul>
          {options}
        </ul>
      </div>
    )
  }
})