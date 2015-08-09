import React from 'react'
import { flux } from '../../../main'

export default React.createClass({

contextTypes: {
  router: React.PropTypes.func
},

 componentDidMount () {
    FB.getLoginStatus(this.handleSessionResponse);
  },

  handleSessionResponse(response) {
    console.log(response)
      //if we dont have a session (which means the user has been logged out, redirect the user)
      if (response.status !== 'connected') {
          var {router} = this.context
          router.transitionTo('login')
          return;
      }

      //if we do have a non-null response.handleSessionResponsesion, call FB.logout(),
      //the JS method will log the user out of Facebook and remove any authorization cookies
      FB.logout(this.handleSessionResponse);
  },
  render () {
    return (
      <div>
      </div>
    )
  }
})