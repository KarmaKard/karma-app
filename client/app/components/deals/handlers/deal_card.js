import React from 'react'
import { flux } from '../../../main'
import Router, {RouteHandler, Link} from 'react-router'

export default React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  render() {
    if(this.props.payments.length === 0){ return <span>Waiting</span>}
    var organizations = this.props.organizations
    var user = this.props.user
    var payments = this.props.payments
    var locations = this.props.locations
    var surveyQuestions = this.props.surveyQuestions
    var surveyResponses = this.props.surveyResponses
    var paymentId = this.context.router.getCurrentParams().paymentId
    var payment = this.props.payments.filter(payment => payment.id === paymentId)[0]
    var redemptions = this.props.redemptions.filter(redemption => redemption.paymentId === paymentId)
    var cardStartDate = parseInt(payment.createdAt)
    var cardExpirationDate = cardStartDate + 31557600000 
    var deals = this.props.deals.filter(deal => parseInt(deal.endDate) > cardExpirationDate /*&& parseInt(deal.beginDate) < cardStartDate*/ ) //No organizations will show until Septermber with this
    var organizations = this.props.organizations
    
    var orgWithQualifiedDeals = new Map()
    var activeDeals = []
    for(var t in deals){
      orgWithQualifiedDeals.set(deals[t].organizationId, deals[t].organizationId)
    }

    var activeCategories = []
    var activeOrganizations = []
    var uniqueCategory = new Map()

    for( var i in organizations ){
      if(organizations[i].category !== "undefined" 
      && organizations[i].category !== "fundraiser" 
      && organizations[i].status === "active" 
      && orgWithQualifiedDeals.has(organizations[i].id)){
        activeOrganizations.push(organizations[i])
        if(!uniqueCategory.has(organizations[i].category)){
          activeCategories.push(organizations[i].category)
          uniqueCategory.set(organizations[i].category, organizations[i].category)
        }
      }
    }

    return (
      <div>
        <RouteHandler 
          organizations={activeOrganizations} 
          categories={activeCategories}
          user={user}
          payment={payment} 
          locations={locations} 
          deals={deals} 
          redemptions={redemptions} 
          surveyQuestions={surveyQuestions} 
          surveyResponses={surveyResponses}/>
      </div>
    )
  }
})
