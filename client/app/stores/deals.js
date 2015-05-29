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
    this.handleAction('deals.getDeals', this.saveDeals)
    this.handleAction('deals.updateDeals', this.replaceDeals)
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

  saveCreateError(error) {
    this.setState({
        createErrors: this.state.createErrors.concat(error)
    })
  }
}
