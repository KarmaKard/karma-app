import { Store } from 'minimal-flux'

export default class OrganizationStore extends Store {
  constructor() {
    super()
    this.state = {
      organizations: [],
      locations: [], 
      createErrors: []
    }

    this.handleAction('organizations.createError', this.saveCreateError)
    this.handleAction('organizations.create',  this.saveOrganization)
    this.handleAction('organizations.getOrganization', this.saveOrganization)
    this.handleAction('organizations.getOrganizations', this.saveOrganizations)
    this.handleAction('organizations.saveLocations', this.saveLocations)
    this.handleAction('organizations.getLocations', this.getLocations)
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

  saveLocations(locations) {
    locations: this.state.locations.concat(locations)
  }

  getLocations(locations){
    this.setState({locations})
  }

  saveCreateError(error) {
    this.setState({
        createErrors: this.state.createErrors.concat(error)
    })
  }
}
