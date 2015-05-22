import { Store } from 'minimal-flux'

export default class OrganizationStore extends Store {
  constructor() {
    super()
    this.state = {
      organizations: [], 
      createErrors: []
    }

    this.handleAction('organizations.create',  this.handleOrganizationCreate)
    this.handleAction('organizations.createError', this.saveCreateError)
    this.handleAction('organizations.getOrganizations', this.saveOrganizations)
  }

  handleOrganizationCreate(organization) {
    this.setState({
      organizations: this.state.organizations.concat(organization)
    })
  }
  
  getOrganizations(organizations){
    this.setState({organizations})
  }

  saveOrganizations(organizations){
    this.setState({organizations})
  }

  getOrganization(organizationId) {  
    return this.state.organizations.filter(org => org.id === organizationId)[0]
  }

  saveCreateError(error) {
    this.setState({
        createErrors: this.state.createErrors.concat(error)
    })
  }
}