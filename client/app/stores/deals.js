import { Store } from 'minimal-flux'

export default class DealStore extends Store {
  constructor() {
    super()
    this.state = {
      deals: [], 
      redemptions: [],
      surveyQuestions: [],
      surveyResponses: [],
      createErrors: []
    }

    this.handleAction('deals.create',  this.handleDealCreate)
    this.handleAction('deals.createError', this.saveCreateError)
    this.handleAction('deals.getDeals', this.saveDeals)
    this.handleAction('deals.updateDeals', this.replaceDeals)
    this.handleAction('deals.deleteDeal', this.deleteDeal)
    this.handleAction('deals.createRedemption', this.handleRedemptionCreate)
    this.handleAction('deals.getRedemptions', this.saveRedemptions)
    this.handleAction('deals.getSurveyQuestions', this.saveQuestions)
    this.handleAction('deals.createSurveyResponse', this.handleSurveyResponseCreate)
    this.handleAction('deals.getSurveyResponses', this.saveResponses)
  }

  handleDealCreate(deals) {
    this.setState({
      deals: this.state.deals.concat(deals)
    })
  }

  saveDeals(deals){
    this.setState({deals})
  }
  
  replaceDeals(deals){
    var allDeals = this.state.deals
    var allDealsMap = allDeals.concat(deals).reduce((m,v) => {
      m.set(v.id, v)
      return m
    }, new Map())

    allDeals = [... allDealsMap.values()]
  }

  deleteDeal(deal){
    var allDeals = this.state.deals
    allDeals.splice(allDeals.map(function(x) {return x.id }).indexOf(deal.id), 1)
    this.setState({deal: allDeals})
  }

  handleRedemptionCreate(redemption) {
    this.setState({
      redemptions: this.state.redemptions.concat(redemption)
    })
  }

  saveRedemptions(redemptions){
    this.setState({redemptions})
  }

  saveQuestions(surveyQuestions){
    this.setState({surveyQuestions})
  }

  handleSurveyResponseCreate(surveyResponse) {
    this.setState({
      surveyResponses: this.state.surveyResponses.concat(surveyResponse)
    })
  }

  saveResponses(surveyResponses){
    this.setState({surveyResponses})
  }

  saveCreateError(error) {
    this.setState({
        createErrors: this.state.createErrors.concat(error)
    })
  }
}
