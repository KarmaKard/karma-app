import { Actions } from 'minimal-flux'
import * as KarmaAPI from '../sources/karma_api'

export default class DealActions extends Actions {
  create(newDeals) {
    var p = KarmaAPI.postDeals(newDeals)
    p.then(deals => {
      if (deals) {
        this.dispatch('create', deals)
      }
      else{
        console.warn('No Deals returned')
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

  deleteDeal(deal) {
    var p = KarmaAPI.deleteDeal(deal)
    p.then(deal => {
      if (deal) {
        this.dispatch('deleteDeal', deal)
      }
      else{
        console.warn('Delete was not successful')
      }
    }).catch(this.deleteError)
  }

  createError(error) {
    console.warn(error)
    this.dispatch('createError', error)
  }

  deleteError(error) {
    console.warn(error)
    this.dispatch('deleteError', error)
  }
}
