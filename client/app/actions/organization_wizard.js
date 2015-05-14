import { Actions } from 'minimal-flux'

export default class OrganizationWizardActions extends Actions {
  
  saveType(router, type) {
    this.dispatch('saveType', type)
  }

  createError(error) {
    console.warn(error)
    this.dispatch('createError', error)
  }
}