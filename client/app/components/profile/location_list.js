import React from 'react'

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

  render(){
    var listItems = this.state.locations.map((location, index) => {
      return (
        <li key={index}>
          {location.street} {location.zip}
          <button className="check-map__button">Check Map</button>
        </li>
      )
    })

    return (
      <div className="location-list" >
        <h3> Locations </h3>
        <div>
          <ul>
            {listItems}
          </ul>
        </div>
        <div>
          <input type="text" className="location-list__street-input" placeholder="Full Street Address" ref="locationInput" value={this.state.newStreet} onChange={this.updateNewStreet} />
          <input type="text" className="location-list__zip-input" placeholder="Zip" value={this.state.newZip} onChange={this.updateNewZip} />
          <button className="location-list__add-button" onClick={this.handleAddNew}> Add Keyword</button>
        </div>
      </div>
    )
  }
})
