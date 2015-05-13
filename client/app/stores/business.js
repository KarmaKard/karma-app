import { Store } from 'minimal-flux'
import {tokenToUser} from '../utils/transforms'

export default class BusinessStore extends Store {

  constructor() {
    super()
    var token = window.localStorage.getItem('karma-token')
    this.state = {
      businesses: {},
      createErrors: []
    }

    this.handleAction('business.create',  this.handleBusinessCreate)
    this.handleAction('business.createError', this.saveCreateError)
  }

  handleBusinessCreate(business) {
    var businesses = this.state.businesses
    businesses[business.id] = business
    this.setState({businesses})
  }

  saveCreateError(error) {
    this.setState({
        createErrors: this.state.createErrors.concat([error])
    })
  }
}