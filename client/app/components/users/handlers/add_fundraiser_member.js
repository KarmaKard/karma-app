import React from 'react'
import { flux } from '../../../main'
import LoginForm from '../login_form'
import Register from '../register'

export default React.createClass({
  getInitialState () {
    return this.getStoreState()
  },

  contextTypes: {
    router: React.PropTypes.func
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
    var {router} = this.context
    var fundraiserMemberId = this.context.router.getCurrentParams().fundraiserMemberId
    var user = this.state.users.currentUser
    if (user) {
      user.roles.fundraiserTeamMember = 'fundraiserTeamMember'
      flux.actions.users.tieFundraiserMembershipToUser(user, fundraiserMemberId, router, 'member_fundraisers')
    }
  },

  componentDidUpdate () {
    var {router} = this.context
    var fundraiserMemberId = this.context.router.getCurrentParams().fundraiserMemberId
    var user = this.state.users.currentUser
    if (user) {
      user.roles.fundraiserTeamMember = 'fundraiserTeamMember'
      flux.actions.users.tieFundraiserMembershipToUser(user, fundraiserMemberId, router, 'member_fundraisers')
    }
  },

  setFbLogin (user) {
    flux.actions.users.facebookLogin(user)
  },

  userLogin (email, password) {
    flux.actions.users.login(email, password)
  },

  createUser (user) {
    flux.actions.users.create(user)
  },

  toggleForm (e) {
    e.preventDefault()
    this.setState({
      isExistingUser: !this.state.isExistingUser
    })
  },

  render () {
    var form = this.state.isExistingUser
      ? <LoginForm loginErrors={this.state.users.loginErrors} setFbLogin={this.setFbLogin} userLogin={this.userLogin} />
      : <Register setFbLogin={this.setFbLogin} userLogin={this.userLogin} createUser={this.createUser}/>

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
