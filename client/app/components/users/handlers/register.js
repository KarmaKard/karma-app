import React from 'react'
import Register from '../register'
import { flux } from '../../../main'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState () {
    return {
      email: null,
      firstName: null,
      lastName: null,
      password: null
    }
  },

  setRegistrationInfo (user) {
    this.setState({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password
    })
  },

  didClick () {
    var user = {
      email: this.state.email,
      firstName: this.state.firstName.charAt(0).toUpperCase() + this.state.firstName.slice(1),
      lastName: this.state.lastName.charAt(0).toUpperCase() + this.state.lastName.slice(1),
      password: this.state.password
    }

    var { router } = this.context
    flux.actions.users.create(user, router)
  },

  setFbLogin (user) {
    flux.actions.users.facebookLogin(user)
  },

  goBack () {
    history.back()
  },

  createUser (user) {
    flux.actions.users.create(user)
  },

  render () {
    return (
      <div>
        <div className='page_header'>
          <div>
            <button onClick={this.goBack} className='back_button'><i className='fa fa-chevron-left fa-2x'></i></button>
            <div className='header_center karmatitle'>KarmaKard</div>
          </div>
        </div>
        <div className='main_card'>
          <div className='content_box-header'>Register</div>
          <Register setRegistrationInfo={this.setRegistrationInfo} setFbLogin={this.setFbLogin} createUser={this.createUser}/>
           <input type='submit' ref='button' onClick={this.didClick} className='karma_button' value='Submit'/>
        </div>
      </div>
    )
  }
})
