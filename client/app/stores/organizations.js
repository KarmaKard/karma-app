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
    this.handleAction('organizations.saveLocation', this.saveNewLocation)
    this.handleAction('organizations.getLocations', this.saveLocations)
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

  saveNewLocation(location) {
    locations: this.state.locations.concat(location)
  }

  saveLocations(locations){
    this.setState({locations})
  }

  saveCreateError(error) {
    this.setState({
        createErrors: this.state.createErrors.concat(error)
    })
  }
}
