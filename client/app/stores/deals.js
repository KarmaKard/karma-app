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
    this.handleAction('deals.getDeals', this.getDeals)
    this.handleAction('deals.updateDeals', this.replaceDeals)
  }

  handleDealCreate(deals) {
    this.setState({
      deals: this.state.deals.concat(deals)
    })
  }

  getDeals(deals){
    this.setState({deals})
  }
  
  replaceDeals(deals){
    var allDeals = this.state.deals
    for(var i in deals) {
      if(allDeals.indexOf(deals[i]) > -1){
        allDeals[allDeals.indexOf(deals[i])] = deals[i]  
      }    
    }
  }

  saveCreateError(error) {
    this.setState({
        createErrors: this.state.createErrors.concat(error)
    })
  }
}
