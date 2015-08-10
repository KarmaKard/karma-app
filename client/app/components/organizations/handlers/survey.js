import React from 'react'
import Survey from '../survey'

export default React.createClass({

  propTypes: {
    surveyQuestions: React.PropTypes.array.isRequired,
    user: React.PropTypes.object.isRequired,
    surveyResponses: React.PropTypes.array.isRequired
  },

  findNewQuestion (surveyResponses) {
    var responseObject = {}
    var surveyQuestions = this.props.surveyQuestions
    surveyResponses.forEach(function (response) {
      responseObject[response.questionId] = response
    })
    for (var i = 0; i < surveyQuestions.length; i++) {
      if (!(surveyQuestions[i].id in responseObject)) {
        return surveyQuestions[i]
      }
    }
  },

  render () {
    var userId = this.props.user.id
    var surveyResponses = this.props.surveyResponses.filter(function (response) {
      if (response.userId === userId) {return response}
    })
    var surveyQuestion = this.findNewQuestion(surveyResponses)
    return <Survey {... this.props} surveyQuestion={surveyQuestion} />
  }
})
