import { Store } from 'minimal-flux'

export default class OrganizationStore extends Store {
  constructor () {
    super()
    this.state = {
      organizations: [],
      organizationId: null,
      locations: [],
      createErrors: []
    }

    this.handleAction('organizations.createError', this.saveCreateError)
    this.handleAction('organizations.create', this.saveOrganization)
    this.handleAction('organizations.getOrganization', this.saveOrganization)
    this.handleAction('organizations.getOrganizations', this.saveOrganizations)
    this.handleAction('organizations.saveLocation', this.saveNewLocation)
    this.handleAction('organizations.getLocations', this.saveLocations)
    this.handleAction('organizations.updateOrganization', this.replaceOrganization)
    this.handleAction('organizations.getOrganizationsAndDeals', this.saveOrganizationsAndDeals)
    this.handleAction('organizations.confirmFundraiser', this.saveOrganization)
  }

  saveOrganizations (organizations) {
    this.setState({organizations})
  }

  saveOrganizationsAndDeals (organizations, deals, organizationId) {
    this.setState({organizations, organizationId})
  }

  saveOrganization (organization) {
    this.setState({
      organizations: this.state.organizations.concat(organization)
    })
  }

  getOrganization (id) {
    return this.state.organizations.filter(org => org.id === id)[0]
  }

  saveNewLocation (location) {
    this.setState({
      locations: this.state.locations.concat(location)
    })
  }

  saveLocations (locations) {
    this.setState({locations})
  }

  replaceOrganization (organization) {
    var allOrganizations = this.state.organizations
    allOrganizations.splice(allOrganizations.map(function (x) {return x.id }).indexOf(organization.id), 1, organization)
    this.setState({organization: allOrganizations})
  }

  saveCreateError (error) {
    this.setState({
        createErrors: this.state.createErrors.concat(error)
    })
  }
}
