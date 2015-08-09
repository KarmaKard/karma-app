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
    var orgWithQualifiedDeals = new Map()
    var deals = this.props.deals.filter(deal => {
      var dealLimitCounter = 0
      this.props.payments.forEach(payment => {
        var paymentExpDate = parseInt(payment.createdAt, 10) + 31557600000
        // if payment hasn't expired
        if (paymentExpDate > Date.now()) {

          // if active payment period is within active deal period
          if (paymentExpDate < parseInt(deal.endDate, 10) /* && parseInt(deal.beginDate, 10) < payment.createdAt*/) {
            dealLimitCounter++
            orgWithQualifiedDeals.set(deal.organizationId, deal.organizationId)
          }
          // another reduce something to build a map of all deals with a key of dealId that
          // a beginning date less than the payment date and an expiration date greater than
          // the 1 year after payment date
        }
      })
      if (dealLimitCounter !== 0) {
        if (deal.limit !== 'unlimited') {
          deal.limit = deal.limit * dealLimitCounter
        }
        return deal
      }
    })
    console.log(deals)
    var locations = this.props.locations
    var surveyQuestions = this.props.surveyQuestions
    var surveyResponses = this.props.surveyResponses
    console.log(this.props.redemptions)
    var redemptions = this.props.redemptions.filter(redemption => redemption.userId === user.id)

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
          locations={locations}
          deals={deals}
          redemptions={redemptions}
          surveyQuestions={surveyQuestions}
          surveyResponses={surveyResponses}/>
      </div>
    )
  }
})
