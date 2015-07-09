import React from 'react'
import Register from '../register'
import { flux } from '../../../main'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState() {
    return {
      email: null,
      firstName: null,
      lastName: null,
      password: null
    }
  },

  setRegistrationInfo(user){
    this.setState({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password
    })
  },

  didClick(){
    var user = { 
      email : this.state.email, 
      firstName : this.state.firstName, 
      lastName : this.state.lastName, 
      password : this.state.password
    }
    
    var { router } = this.context
    flux.actions.users.create(router, user)
  },

  render(){
    return (
      <div>
        <div className="page_header">
          <div className="page_header_title">KarmaKard</div>
        </div>
        <div className="content_box">
          <div className="content_box-header">Register</div>
          <Register setRegistrationInfo={this.setRegistrationInfo}/>
           <input type="submit" ref="button" onClick={this.didClick} className="karma_button" value="Submit"/>
        </div>
      </div>
    )
  }
})