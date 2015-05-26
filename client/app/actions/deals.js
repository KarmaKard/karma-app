import { Actions } from 'minimal-flux'
import * as KarmaAPI from '../sources/karma_api'

export default class DealActions extends Actions {
  create(dealData) {
    var p = KarmaAPI.postDeal(dealData)
    p.then(deal => {
      if (deal) {
        this.dispatch('create', deal)
      }
      else{
        console.warn('No Deal returned')
      }

    }).catch(this.createError)
  } 

  getDeals(){
    var p = KarmaAPI.getDeals()
      p.then(deals => {
        if (deals) {
          this.dispatch('getDeals', deals)
        }
        else{
          console.warn('No Deals Returned')
        }
      }).catch(this.createError)
  }

  updateDeals(changedDeals) {
    var p = KarmaAPI.updateDeals(changedDeals)
    p.then(deals => {
      if (deals) {
        this.dispatch('updateDeals', deals)
      }
      else{
        console.warn('Updated Deals Not Returned')
      }
    }).catch(this.createError)
  }


  createError(error) {
    console.warn(error)
    this.dispatch('createError', error)
  }
}
