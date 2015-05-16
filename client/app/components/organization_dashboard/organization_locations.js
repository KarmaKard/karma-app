import React from 'react'
import { flux } from '../../main'

export default React.createClass({
  getInitialState(){
    return {
      newStreet: '',
      newZip: '',
      locations: []
    }
  },

  updateNewStreet(e){
    this.setState({
      newStreet: e.target.value
    })
  },

  updateNewZip(e){
    this.setState({
      newZip: e.target.value
    })
  },

  handleAddNew(){
    var newLocation = {
      street: this.state.newStreet,
      zip: this.state.newZip
    }
    this.setState({
      newStreet: '',
      newZip: '',
      locations: this.state.locations.concat([newLocation])
    })
    React.findDOMNode(this.refs.locationInput).focus()
  },
  render() {
    var listItems = this.state.locations.map((location, index) => {
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
          <input type="text" className="karma_input street_address_input" placeholder="Full Street Address" ref="locationInput" value={this.state.newStreet} onChange={this.updateNewStreet} />
          <input type="text" className="zip_input karma_input " placeholder="Zip" value={this.state.newZip} onChange={this.updateNewZip} />
          <button className="karma_button" onClick={this.handleAddNew}> Add location</button>
        </div>
      </div>
    )
  }
})
