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
  }

  handleOrganizationCreate(organization) {
    this.setState({
      organizations: this.state.organizations.concat(organization)
    })
  }

  getOrganizationsByUserId(userId) {
    return this.organizations.filter(org => org.userId === userId)
  }

  saveCreateError(error) {
    this.setState({
        createErrors: this.state.createErrors.concat(error)
    })
  }
}
