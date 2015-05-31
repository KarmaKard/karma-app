import React from 'react'
import { flux } from '../../main'

export default React.createClass({
  changeMade(){
    React.findDOMNode(this.refs.saveButton).style.border="3px solid rgb(242, 29, 29)"
  },

  saveProfile(){
    var name = React.findDOMNode(this.refs.name).value
    var category = React.findDOMNode(this.refs.category).value
    var description = React.findDOMNode(this.refs.description).value
    var logo = React.findDOMNode(this.refs.logo).src

    this.props.organization.name = name
    this.props.organization.category = category
    this.props.organization.description = description
    this.props.organization.logoURL = logo

    this.props.updateOrganization(this.props.organization)
    React.findDOMNode(this.refs.saveButton).style.border="3px solid rgb(75, 187, 44)"
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
          />

          <span className="label-span">Category</span>
          <select ref="category" onChange={this.changeMade} className="karma_input" defaultValue={this.props.organization.category}>
            <option value="dining">Dining</option>
            <option value="entertainment"> Entertainment</option>
            <option value="health&fitness">Health & Fitness</option>
            <option value="home&garden">Home & Garden</option>
            <option value="professional">Professional</option>
            <option value="services">Services</option>
            <option value="shopping">Shopping</option>
          </select>
          <span className="label-span">Business Description</span>
          <textarea
            ref="description"
            className="karma_input"
            placeholder="Write business description here."
            onChange={this.changeMade}
            defaultValue={this.props.organization.description} />
          <span ref="logo" className="label-span"> Business Logo</span>
          <img className="organization_profile-logo" src="http://chic-chester.co.uk/wp-content/uploads/2014/08/20140806_LogoSupporterPlaceholder.png" alt="logo" height="100" width="100" />
          <button ref="saveButton" className="karma_button" onClick={this.saveProfile}>Save</button>
      </div>
    )
  }
})