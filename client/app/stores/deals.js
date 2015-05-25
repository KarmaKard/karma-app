import { Store } from 'minimal-flux'

export default class DealStore extends Store {
  constructor() {
    super()
    this.state = {
      deals: [], 
      createErrors: []
    }

    this.handleAction('deals.create',  this.handleDealCreate)
    this.handleAction('deals.createError', this.saveCreateError)
    this.handleAction('deals.getDeals', this.replaceDeals)
  }

  handleDealCreate(deal) {
    this.setState({
      deals: this.state.deals.concat(deal)
    })
  }
  
  replaceDeals(deals){
    this.setState({deals})
  }

  saveCreateError(error) {
    this.setState({
        createErrors: this.state.createErrors.concat(error)
    })
  }
}
