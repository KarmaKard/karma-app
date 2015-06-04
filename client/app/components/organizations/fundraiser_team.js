import React from 'react'
import { flux } from '../../main'

export default React.createClass({
  getInitialState(){
    return {
      teamMembers: [],
      newName: '',
      newEmail: '',
      organization: {}
    }
  },

  componentWillMount() {
    if(this.props.organization){
      this.setState({teamMembers: this.props.organization.teamMembers, organization: this.props.organization})
    }
  },

  updateName(e){
    this.setState({
      newName: e.target.value
    })
    React.findDOMNode(this.refs.saveButton).style.border="3px solid rgb(242, 29, 29)"
  },

  updateNewEmail(e){
    this.setState({
      newEmail: e.target.value
    })
    if(this.validateEmail(e.target.value)){
      React.findDOMNode(this.refs.email).style.border=""
    }
    React.findDOMNode(this.refs.saveButton).style.border="3px solid rgb(242, 29, 29)"
  },

  handleAddNew(){
    if( !this.validateEmail(this.state.newEmail)){
      React.findDOMNode(this.refs.email).style.border="3px solid rgb(242, 29, 29)"
      return
    }

    var newMember = {
      name: this.state.newName,
      email: this.state.newEmail
    }

    var teamMembers = this.state.teamMembers.concat(newMember)
    var organization = this.state.organization
    organization.teamMembers = teamMembers 

    this.setState({
      newName: '',
      newEmail: '',
      teamMembers,
      organization
    })

    flux.actions.organizations.updateOrganization(organization)

    React.findDOMNode(this.refs.saveButton).style.border="3px solid rgb(75, 187, 44)"
    React.findDOMNode(this.refs.name).focus()
  },

  validateEmail(emailString){
    return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/.test(emailString)
  },

  render() {
    console.log(this.props.organization)
    var memberArray
    if(this.state.teamMembers.length === 0) {
      memberArray = this.props.organization.teamMembers
    }
    else{
      memberArray = this.state.teamMembers
    }

    var listItems = memberArray.map((member, index) => {
      return (
        <li key={index}>
          {member.name}
        </li>
      )
    })
    return (
      <div>
        <div className="content_box-header">Members</div>
        <div>
          <ul className="location_list">
            {listItems}
          </ul>
        </div>
        <div>
          <input 
            type="text" 
            className="karma_input name_address_input" 
            placeholder="Name" 
            ref="name" 
            value={this.state.newName} 
            onChange={this.updateName} 
            disabled={this.props.editDisabled}/>
          <input 
            type="text" 
            ref="email" 
            className="email_input karma_input " 
            placeholder="Email" 
            value={this.state.newEmail} 
            onChange={this.updateNewEmail} 
            disabled={this.props.editDisabled} />
          <button 
            ref="saveButton" 
            className="karma_button" 
            onClick={this.handleAddNew} 
            hidden={this.props.editDisabled}>
              Save
          </button>
        </div>
      </div>
    )
  }
})