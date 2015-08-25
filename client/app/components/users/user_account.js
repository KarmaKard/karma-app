import React from 'react'
import {flux} from '../../main'
import { Link } from 'react-router'

export default React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  propTypes: {
    user: React.PropTypes.object.isRequired,
    totalSaved: React.PropTypes.number.isRequired
  },

  componentDidMount () {
    (function (d, s, id) {
      var js
      var fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) return
      js = d.createElement(s)
      js.id = id
      js.src = '//connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))
  },

  fbAsyncInit () {
    FB.init({
      appId: '550843868397495',
      cookie: true,
      xfbml: true,
      version: 'v2.4'
    })
   FB.getLoginStatus(this.handleSessionResponse)
  },

  handleSessionResponse (response) {
    if (response.status !== 'connected') {
      var {router} = this.context
      flux.actions.users.logout(router)
    }
    FB.logout(this.handleSessionResponse)
  },

  logOut () {
    if (!this.props.user.fbUserId) {
      var {router} = this.context
      flux.actions.users.logout(router)
    }

    this.fbAsyncInit()
  },

  render () {
    var addNewLink = null
    var user = this.props.user
    if (!user.roles.manager && !user.roles.superadmin) {
      addNewLink = (
        <div>
          <hr />
          <Link to= 'create_organization' className= 'create_organization-link'>
            Business? Fundraiser?
            <span className= 'create_organization-link_span'>Offer deals with us!</span>
          </Link>
        </div>
      )
    }

    return (
      <div>
        <div className= 'content_box-header'>
          Account
        </div>
        <div className= 'content_box-content'>
          <h3>You have saved ${(Math.round(this.props.totalSaved * 100) / 100).toFixed(2)}!</h3>
          <p>Thank you for being an awesome donor!</p>
          <br/>
            <label>
              Email
              <input
                type= 'text'
                className= 'karma_input'
                placeholder= 'Type Keyword'
                defaultValue={this.props.user.email}
              />
            </label>
            <button className= 'karma_button' onClick={this.logOut}>Log Out</button>
        </div>
        {addNewLink}
      </div>
    )
  }
})
