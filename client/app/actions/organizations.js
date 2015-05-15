import { Actions } from 'minimal-flux'
import * as KarmaAPI from '../sources/karma_api'

export default class UserActions extends Actions {
   create(router, organizationData) {
    KarmaAPI.postNewOrganization(organizationData).then(organization => {
      if (organization) {
        this.dispatch('create', organization)
        return router.transitionTo('organization')
      }
      console.warn('No Organization returned from create')
    }).catch(this.createError)
  }

  createError(error) {
    console.warn(error)
    this.dispatch('createError', error)
  }
}
