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

  handleDealCreate(deal) {
    this.setState({
      deals: this.state.deals.concat(deal)
    })
  }

  getDeals(deals){
    this.setState({deals})
  }
  
  replaceDeals(deals){
    console.log(deals)
    var allDeals = this.state.deals
    for (let i in deals) {
      for(let t in allDeals) {
        if (deals[i].id === allDeals[t].id) {
          allDeals.splice(t, 1, deals[i])
          this.setState({deals: allDeals})
        }
      }
    }
  }

  saveCreateError(error) {
    this.setState({
        createErrors: this.state.createErrors.concat(error)
    })
  }
}
