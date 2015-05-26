import React from 'react'
import { flux } from '../../main'

export default React.createClass({
  changeMade(){
    console.log("make this red!")
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
            <option value="Ice Cream and Treats">Ice Cream and Treats</option>
            <option value="Pizza">Pizza</option>
            <option value="Sandwiches and Burgers">Sandwiches and Burgers</option>
            <option value="Restaurants">Restaurants</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Retail">Retail</option>
            <option value="Services">Services</option>
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
