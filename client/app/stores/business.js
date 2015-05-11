import { Store } from 'minimal-flux'
import {tokenToUser} from '../utils/transforms'

export default class BusinessStore extends Store {

  constructor() {
    super()
    var token = window.localStorage.getItem('karma-token')
    this.state = {
      current: token ? tokenToUser(token) : null,
      authenticated: token ? true : false,
      createErrors: []
    }
    this.handleAction('business.create',  this.handleAuth)
    this.handleAction('users.createError', this.storeCreateError)
  }

  handleAuth(user) {
    this.setState({ user, authenticated: true })
    console.log(this.state)
  }

  storeCreateError(error) {
    this.setState({
        createErrors: this.state.createErrors.concat([error])
    })
  }
}