import React from 'react'
import { flux } from '../../main'

export default React.createClass({
  getInitialState() {
    return {
      descriptionCounter: 150,
      purposeCounter: 150
    }
  },

  componentWillMount(){
    var descriptionCharactersLeft, purposeCharactersLeft
    if(this.props.organization.description || this.props.organization.purpose){
      this.setState({
        descriptionCounter: 150 - this.props.organization.description.length,
        purposeCounter: 150 - this.props.organization.purpose.length
      })
    }
    else{
      this.setState({
          descriptionCounter: 150,
          purposeCounter: 150
      })
    }
  },

  changeMade(){
    React.findDOMNode(this.refs.saveButton).style.border="3px solid rgb(242, 29, 29)"
  },

  saveProfile(){

    if(React.findDOMNode(this.refs.description).value.length > 150){
      React.findDOMNode(this.refs.descriptionCharacterCount).style.color="rgb(242, 29, 29)"
      return
    }
    var name = React.findDOMNode(this.refs.name).value
    var description = React.findDOMNode(this.refs.description).value
    var purpose = React.findDOMNode(this.refs.purpose).value
    var logo = React.findDOMNode(this.refs.logo).src

    this.props.organization.name = name
    this.props.organization.description = description
    this.props.organization.purpose = purpose
    this.props.organization.logoURL = logo

    this.props.updateOrganization(this.props.organization)
    React.findDOMNode(this.refs.saveButton).style.border="3px solid rgb(75, 187, 44)"
  },

  descriptionCounter(e){
    this.setState({descriptionCounter: 150 - e.target.textLength})
  },

  purposeCounter(e){
    this.setState({purposeCounter: 150 - e.target.textLength})
  },

  render() {
    return (
      <div>
        <div className="content_box-header">Profile</div>
          <span className="label-span">Name</span>
          <input
            type="text"
            ref="name"
            className="karma_input"
            onChange={this.changeMade}
            defaultValue={this.props.organization.name}
            disabled={this.props.editDisabled} />

          <span className="label-span">Fundraiser Description</span>
          <span ref="descriptionCharacterCount" className="profile_description-counter">{this.state.descriptionCounter}</span>
          <textarea
            ref="description"
            className="karma_input"
            placeholder="Write fundraiser description here."
            onChange={this.changeMade}
            onKeyUp={this.descriptionCounter}
            defaultValue={this.props.organization.description} 
            disabled={this.props.editDisabled}/>
          <span className="label-span">Fundraiser Purpose</span>
          <span ref="purposeCharacterCount" className="profile_description-counter">{this.state.purposeCounter}</span>
          <textarea
            ref="purpose"
            className="karma_input"
            placeholder="Write fundraiser purpose here."
            onChange={this.changeMade}
            onKeyUp={this.purposeCounter}
            defaultValue={this.props.organization.purpose} 
            disabled={this.props.editDisabled}/>
          <span ref="logo" className="label-span"> Fundraiser Logo</span>
          <img className="organization_profile-logo" src="/img/logo-placeholder.png" alt="logo" height="100" width="100" />
          <button ref="saveButton" className="karma_button" onClick={this.saveProfile} disabled={this.props.editDisabled}>Save</button>
      </div>
    )
  }
})