import { Actions } from 'minimal-flux'
import * as KarmaAPI from '../sources/karma_api'

export default class BusinessActions extends Actions {
  create(router, businessData) {
    businessData.type = "business"
    KarmaAPI.postNewBusiness(businessData).then(business => {
      if (business) {
        this.dispatch('create', business)
        return router.transitionTo('business')
      }
      console.warn('No business returned from create')
    }).catch(this.createError)
  }

  createError(error) {
    console.warn(error)
    this.dispatch('createError', error)
  }
}
