import React from 'react'
import { flux } from '../../main'

export default React.createClass({
  getInitialState(){
    return {
      locations: [],
      newStreet: '',
      newZip: ''
    }
  },

  componentWillMount() {
    if(this.props.initialLocations.length > 0){
      this.setState({locations: this.props.initialLocations})
    }
  },

  updateNewStreet(e){
    this.setState({
      newStreet: e.target.value
    })
    React.findDOMNode(this.refs.saveButton).style.border="3px solid rgb(242, 29, 29)"
  },

  updateNewZip(e){
    this.setState({
      newZip: e.target.value
    })
    if( /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(e.target.value)){
      React.findDOMNode(this.refs.zip).style.border=""
    }
    React.findDOMNode(this.refs.saveButton).style.border="3px solid rgb(242, 29, 29)"
  },

  handleAddNew(){
    if( !/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(this.state.newZip)){
      React.findDOMNode(this.refs.zip).style.border="3px solid rgb(242, 29, 29)"
      return
    }
    var newLocation = {
      street: this.state.newStreet,
      zip: this.state.newZip,
      organizationId: this.props.organization.id
    }

    this.setState({
      newStreet: '',
      newZip: '',
      locations: this.state.locations.concat(newLocation)
    })

    flux.actions.organizations.saveLocation(newLocation)
    flux.actions.organizations.getLocations()
    React.findDOMNode(this.refs.saveButton).style.border="3px solid rgb(75, 187, 44)"

    React.findDOMNode(this.refs.locationInput).focus()
  },

  render() {
    var locationArray
    if(this.state.locations.length === 0) {
      locationArray = this.props.initialLocations
    }
    else{
      locationArray = this.state.locations
    }

    var listItems = locationArray.map((location, index) => {
      return (
        <li key={index}>
          {location.street} {location.zip}
        </li>
      )
    })
    return (
      <div>
        <div className="content_box-header">Locations</div>
        <div>
          <ul className="location_list">
            {listItems}
          </ul>
        </div>
        <div>
          <input 
            type="text" 
            className="karma_input street_address_input" 
            placeholder="Full Street Address" 
            ref="locationInput" 
            value={this.state.newStreet} 
            onChange={this.updateNewStreet} 
            disabled={this.props.editDisabled}/>
          <input 
            type="text" 
            ref="zip" 
            className="zip_input karma_input " 
            placeholder="Zip" 
            value={this.state.newZip} 
            onChange={this.updateNewZip} 
            disabled={this.props.editDisabled} />
          <button 
            ref="saveButton" 
            className="karma_button" 
            onClick={this.handleAddNew} 
            disabled={this.props.editDisabled}>
              Save
          </button>
        </div>
      </div>
    )
  }
})