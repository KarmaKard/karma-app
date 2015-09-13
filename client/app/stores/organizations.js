import { Store } from 'minimal-flux'

export default class OrganizationStore extends Store {
  constructor () {
    super()
    this.state = {
      organizations: [],
      organizationId: null,
      createErrors: []
    }

    this.handleAction('organizations.createError', this.saveCreateError)
    this.handleAction('organizations.create', this.saveOrganization)
    this.handleAction('organizations.getOrganization', this.saveOrganization)
    this.handleAction('organizations.getOrganizations', this.saveOrganizations)
    this.handleAction('organizations.saveLocation', this.replaceOrganization)
    this.handleAction('organizations.updateOrganization', this.replaceOrganization)
    this.handleAction('organizations.confirmFundraiser', this.saveOrganization)
  }

  saveOrganizations (organizations) {
    this.setState({organizations})
  }

  saveOrganization (organization, user) {
    this.setState({
      organizations: this.state.organizations.concat(organization)
    })
  }

  getOrganization (id) {
    return this.state.organizations.filter(org => org.id === id)[0]
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
