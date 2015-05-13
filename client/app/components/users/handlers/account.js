import React from 'react'
import { Link } from 'react-router'
import { flux } from '../../../main'

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
    } else {
      var node = React.findDOMNode(this.refs.emailInput)
      node.disabled = false
      node.focus()
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
        <h1>Account</h1>
        <form className="Dashboard_form">
          Email:
          <input
            type="text"
            ref="emailInput"
            className="karma_input"
            defaultValue={this.state.users.currentUser.email}
            disabled={!this.state.editing}
          /> 
          <button className="karma_button" onClick={this.toggleEdit}>
            {editButtonText}
          </button>
        </form>
        <Link className="karma_button" to="businesses">Manage Businesses</Link>
      </div>
    )
  }
})
