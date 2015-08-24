import { Actions } from 'minimal-flux'
import * as KarmaAPI from '../sources/karma_api'

export default class OrganizationsActions extends Actions {
  create (organizationData, router, whereTo) {
    var p = KarmaAPI.postNewOrganization(organizationData)
    p.then(response => {
      if (response) {
        this.dispatch('create', response.organization, response.user)
        return router
          ? router.transitionTo(whereTo, {organizationId: response.organization.id})
          : null
      }
      console.warn('No Organization returned from create')
    }).catch(this.createError)
  }

  updateOrganization (organization) {
    var p = KarmaAPI.updateOrganization(organization)
    p.then(organization => {
      if (organization) {
        this.dispatch('updateOrganization', organization)
      }
    })
  }

  getOrganizations () {
    var p = KarmaAPI.getOrganizations()
    p.then(organizations => {
      if (organizations) {
        this.dispatch('getOrganizations', organizations)
      }
    }).catch(this.getOrganizationsError)
  }

  getOrganization (id) {
    var p = KarmaAPI.getOrganization(id)
    p.then(organization => {
      if (organization) {
        this.dispatch('getOrganization', organization)
      }
    }).catch(this.getOrganizationsError)
  }

  getOrganizationsError (error) {
    console.warn(error)
  }

  saveLocation (location) {
    var p = KarmaAPI.saveLocation(location)
    p.then(location => {
      if (location) {
        this.dispatch('saveLocation', location)
      }
    }).catch(this.createError)
  }

  getLocations () {
    var p = KarmaAPI.getLocations()
    p.then(locations => {
      if (locations) {
        this.dispatch('getLocations', locations)
      }
    }).catch(this.getLocationsError)
  }

  createFundraiserMember (organization, newMember) {
    var p = KarmaAPI.createFundraiserMember(organization, newMember)
    p.then(fundraiserMember=> {
      if (fundraiserMember) {
        this.dispatch('createFundraiserMember', fundraiserMember)
      }
    })
  }

  getOrganizationsAndDeals (fundraiserMemberId) {
    var p = KarmaAPI.getOrganizationsAndDeals(fundraiserMemberId)
    p.then(response => {
      if (response) {
        this.dispatch('getOrganizationsAndDeals', response.organizations, response.deals, response.organizationId)
      }
    })
  }

  confirmFundraiser (organization, fundraiserMembers) {
    var p = KarmaAPI.confirmFundraiser(organization, fundraiserMembers)
    p.then(organization => {
      if (organization) {
        this.dispatch('confirmFundraiser', organization)
      }
    })
  }

  updateOwedAmounts (paidMembers) {
    var p = KarmaAPI.updateOwedAmounts(paidMembers)
    p.then(fundraiserMembers => {
      if (fundraiserMembers) {
        this.dispatch('updateOwedAmounts', fundraiserMembers)
      }
    })
  }

  createError (error) {
    console.warn(error)
    this.dispatch('createError', error)
  }
}
