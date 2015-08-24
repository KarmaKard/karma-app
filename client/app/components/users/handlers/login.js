import React from 'react'
import { flux } from '../../../main'
import LoginForm from '../login_form'
import NewUser from '../new_user'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState () {
    return this.getStoreState()
  },

  getStoreState () {
    return {
      users: flux.stores.users.getState(),
      mismatchPasswords: false,
      isExistingUser: true
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

  componentDidMount () {
    var currentUser = this.state.users.currentUser
    if (currentUser) {
      var router = this.context.router
      router.transitionTo('deals')
    }

    (function (d, s, id) {
      var js
      var fjs = d.getElementsByTagName(s)[0]

      if (d.getElementById(id)) return
      js = d.createElement(s)
      js.id = id
      js.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4&appId=550843868397495'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))
  },

  toggleForm (e) {
    e.preventDefault()
    this.setState({
      isExistingUser: !this.state.isExistingUser
    })
  },

  setFbLogin (user) {
    var {router} = this.context
    flux.actions.users.facebookLogin(user, router, 'deals')
  },

  userLogin (email, password) {
    var {router} = this.context
    flux.actions.users.login(email, password, router, 'deals')
  },

  render () {
    var form = this.state.isExistingUser
      ? <LoginForm loginErrors={this.state.users.loginErrors} setFbLogin={this.setFbLogin} userLogin={this.userLogin} />
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
