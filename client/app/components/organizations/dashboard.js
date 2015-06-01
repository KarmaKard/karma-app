import React from 'react'
import { flux } from '../../main'

export default React.createClass({

  submitToReview(){
    var organization = this.props.organization
    organization.organizationStatus = "review"
    this.props.updateOrganization(organization)
  },

  render() {
    var addLocations, addDeals, addKeywords, submitButton
    var message = "You have some task(s) remaining before your business can be reviewed:"
    if(this.props.initialLocations.length === 0){addLocations = <li>Add location(s)</li>}
    if(this.props.deals.length >= 2){
      var freeDealExists
      this.props.deals.forEach(function(deal){
        if(deal.type === "Free"){
          freeDealExists = true
        }
      })
      if(freeDealExists !== true){
        addDeals = <li>Add Deal(s)</li>
      }
    }
    else{
      addDeals = <li>Add Deal(s)</li>
    }

    if(!this.props.organization.keywords){addKeywords = <li>Add Keyword(s)</li>}

    if(!addDeals && !addKeywords && !addLocations){
      message = "All required information has been completed. Please thoroughly review your information before you submit this business to be reviewed."
      submitButton = <button onClick={this.submitToReview} className="karma_button">Submit for Review</button>
    }

    if(this.props.editDisabled){
      message = "Your Organization is now being reviewed. Do not change any of the information you have already submitted."
      submitButton = null
    }
    
    return (
      <div>
        <div className="content_box-header">
          Dashboard
        </div>
        <p>
          {message}
        </p>
        <ul className="toDoList">
          {addLocations}
          {addDeals}
          {addKeywords}
        </ul>
        {submitButton}
      </div>
    )
  }
})
