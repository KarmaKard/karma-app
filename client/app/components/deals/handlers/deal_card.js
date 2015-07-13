import React from 'react'
import {RouteHandler} from 'react-router'

export default React.createClass({

  propTypes: {
    organizations: React.PropTypes.array.isRequired,
    user: React.PropTypes.object.isRequired,
    payments: React.PropTypes.array.isRequired,
    locations: React.PropTypes.array.isRequired,
    surveyQuestions: React.PropTypes.array.isRequired,
    surveyResponses: React.PropTypes.array.isRequired,
    redemptions: React.PropTypes.array.isRequired,
    deals: React.PropTypes.array.isRequired
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  render () {
    var organizations = this.props.organizations
    var user = this.props.user
    var payments = this.props.payments
    var locations = this.props.locations
    var surveyQuestions = this.props.surveyQuestions
    var surveyResponses = this.props.surveyResponses
    var paymentId = this.context.router.getCurrentParams().paymentId
    var payment = payments.filter(payment => payment.id === paymentId)[0]
    var redemptions = this.props.redemptions.filter(redemption => redemption.paymentId === paymentId)
    var cardStartDate = payment ? parseInt(payment.createdAt, 10) : null
    var cardExpirationDate = cardStartDate + 31557600000
    var deals = this.props.deals.filter(deal => parseInt(deal.endDate, 10) > cardExpirationDate /*&& parseInt(deal.beginDate) < cardStartDate*/ ) //No organizations will show until Septermber with this
    var orgWithQualifiedDeals = new Map()

    for (var t in deals) {
      orgWithQualifiedDeals.set(deals[t].organizationId, deals[t].organizationId)
    }

    var activeCategories = []
    var activeOrganizations = []
    var uniqueCategory = new Map()

    for (var i in organizations) {
      if (organizations[i].category !== 'undefined' &&
        organizations[i].category !== 'fundraiser' &&
        organizations[i].status === 'active' &&
        orgWithQualifiedDeals.has(organizations[i].id)) {
        activeOrganizations.push(organizations[i])
        if (!uniqueCategory.has(organizations[i].category)) {
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
