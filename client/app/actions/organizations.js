import { Actions } from 'minimal-flux'
import * as KarmaAPI from '../sources/karma_api'

export default class OrganizationsActions extends Actions {
  create(router, organizationData) {
    var p = KarmaAPI.postNewOrganization(organizationData)
    p.then(organization => {
      if (organization) {
        this.dispatch('create', organization)
        return router.transitionTo('organization', {organizationId: organization.id})
      }
      console.warn('No Organization returned from create')
    }).catch(this.createError)
  }

  updateOrganization(organization){
    var p = KarmaAPI.updateOrganization(organization)
    p.then(organization => {
      if (organization){
        this.dispatch('updateOrganization', organization)
      }
    })
  }

  getOrganizations(){
    var p = KarmaAPI.getOrganizations()
      p.then(organizations => {
        if (organizations) {
          this.dispatch('getOrganizations', organizations)
        }
      }).catch(this.createError)
  }

  createError(error) {
    console.warn(error)
    this.dispatch('createError', error)
  }
}
