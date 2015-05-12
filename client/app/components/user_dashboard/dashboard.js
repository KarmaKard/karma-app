import React from 'react'
import Router, {RouteHandler} from 'react-router'
import { flux } from '../../main'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState() {
    return Object.assign(this.getStoreState(),{
      editing: false,
    })
  },

  getStoreState() {
    return {
      users: flux.stores.users.getState()
    }
  },

  toggleEdit(e){
    e.preventDefault()

    if(this.state.editing === true){
      this.setState({
        editing: false
      })
      React.findDOMNode(this.refs.usernameInput).focus()
    }
    else{
      this.setState({
        editing: true
      })
    }
  },

  addBusinessClicked(e){
    e.preventDefault()
    this.context.router.transitionTo('profile_builder')
  },

  render: function(){
    var editButtonText = this.state.editing ? 'Save' : 'Edit'

    return(
      <div className="Dashboard">
        <h1>This is the user dashboard</h1>
        <form className="Dashboard_form">
          Email:
          <input
            type="text"
            className="karma_input"
            defaultValue={this.state.users.currentUser.email}
            disabled={!this.state.editing}
          /> 
          <button className="karma_button" onClick={this.toggleEdit}>
            {editButtonText}
          </button>
        </form>
        <button className="karma_button" onClick={this.addBusinessClicked} > Add a Business</button>
      </div>
    )
  }
})
