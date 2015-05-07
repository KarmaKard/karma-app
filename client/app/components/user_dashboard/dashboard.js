import React from 'react'
import Router, {RouteHandler} from 'react-router'
import {Link} from 'react-router'

export default React.createClass({
  getInitialState(){
    return {
      editstatus: true,
      username: 'pnemrow',
      email: 'pnemrow@gmail.com',
      disabled: true,
      editHide: false,
      saveHide: true
    }
  },
  toggleEdit(e){
    e.preventDefault();
    if(this.state.editstatus == true){
      this.setState({
        disabled: false,
        editHide: true,
        saveHide: false,
        editstatus: false
      })
      React.findDOMNode(this.refs.usernameInput).focus()
    }
    else{
      this.setState({
        disabled: true,
        editHide: false,
        saveHide: true,
        editstatus: true
      })
    }
  },

  render: function(){
    return(
      <div>
        <h1>This is the user dashboard</h1>
        <form >
          Username:
          <input type="text" ref="usernameInput" className="user_dashboard-username" defaultValue={this.state.username} disabled = {this.state.disabled} />
          Email:
          <input type="text" className="user_dashboard-email" defaultValue={this.state.email} disabled = {this.state.disabled} /> 
          <button className="user_dashboard-info_edit_button" onClick={this.toggleEdit} hidden={this.state.editHide}>Edit Information</button>
          <button className="user_dashboard-info_save_button" onClick={this.toggleEdit} hidden={this.state.saveHide} >Save</button>
        </form>
        <p><Link className="add_business-button" to="profile_builder" > Add a Business </Link></p>
      </div>
    )
  }
})

