import { Store } from 'minimal-flux'


export default class OrganizationWizardStore extends Store {

  constructor() {
    super()
    this.state = {
      organizationType: null,
      organizationName: null,
      organizationcategory: null,
      organizationLogoURL: null,
      createErrors: []
    }
    this.handleAction('wizard.saveType', this.saveType)
  }

  saveType(type) {
    this.setState({
      orgnizationType: type
    })
  }
}