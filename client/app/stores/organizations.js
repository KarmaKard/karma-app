import { Store } from 'minimal-flux'

export default class OrganizationStore extends Store {
  constructor() {
    super()
    this.state = {
      organizations: [], 
      createErrors: []
    }

    this.handleAction('organizations.createError', this.saveCreateError)
    this.handleAction('organizations.create',  this.saveOrganization)
    this.handleAction('organizations.getOrganization', this.saveOrganization)
    this.handleAction('organizations.getOrganizations', this.saveOrganizations)
  }

  saveOrganizations(organizations){
    this.setState({organizations})
  }

  saveOrganization(organization){
    this.setState({
      organizations: this.state.organizations.concat(organization)
    })
  }

  getOrganization(id) {  
    return this.state.organizations.filter(org => org.id === id)[0]
  }

  saveCreateError(error) {
    this.setState({
        createErrors: this.state.createErrors.concat(error)
    })
  }
}
