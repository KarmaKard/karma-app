import { Store } from 'minimal-flux'

export default class OrganizationStore extends Store {
  constructor() {
    super()
    this.state = {
      currentOrganization: null, 
      createErrors: []
    }

    this.handleAction('organizations.create',  this.handleOrganizationCreate)
    this.handleAction('organizations.createError', this.saveCreateError)
  }

  handleOrganizationCreate(organization) {
    this.setState({currentOrganization: organization})
  }

  saveCreateError(error) {
    this.setState({
        createErrors: this.state.createErrors.concat([error])
    })
  }
}