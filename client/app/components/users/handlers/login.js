import React from 'react'
import { flux } from '../../../main'
import LoginForm from '../login_form'
import NewUser from '../new_user'

export default React.createClass({
  getInitialState () {
    return Object.assign(this.getStoreState(), {
      mismatchPasswords: false,
      isExistingUser: true
    })
  },

  getStoreState () {
    return {
      users: flux.stores.users.getState()
    }
  },

  storeChange () {
    this.setState(this.getStoreState())
  },

  componentWillMount () {
    flux.stores.users.addListener('change', this.storeChange)
  },

  componentWillUnmount () {
    flux.stores.users.removeListener('change', this.storeChange)
  },

  toggleForm (e) {
    e.preventDefault()
    this.setState({
      isExistingUser: !this.state.isExistingUser
    })
  },

  render () {
    var form = this.state.isExistingUser
      ? <LoginForm loginErrors={this.state.users.loginErrors}/>
      : <NewUser/>

    var toggleButtonText = this.state.isExistingUser ? 'New User?' : 'Existing User?'

    return (
      <div>
        <div className= 'page_header'>
          <div className= 'header_left karmatitle'>KarmaKard</div>
          <button className='header_right' onClick={this.toggleForm}>{toggleButtonText}</button>
        </div>
        <div className= 'guest_box'>
          {form}
        </div>
      </div>
    )
  }
})
