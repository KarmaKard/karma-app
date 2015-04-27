import React from 'react'

var AddKeyword = React.createClass({
  getInitialState: function(){
    return {
      newStreet: '',
      newZip: ''
    }
  },
  updateNewStreet: function(e){
    this.setState({
      newStreet: e.target.value
    })
  },
  updateNewZip: function(e){
    this.setState({
      newZip: e.target.value
    })
  },
  handleAddNew: function(){
    this.props.addNew([this.state.newStreet, this.state.newZip])
    this.setState({
      newStreet: '',
      newZip: ''
    })
    React.findDOMNode(this.refs.location_input).focus()
  },
  render: function(){
    return (
      <div>
        <input type="text" className="location-list__street-input" placeholder="Full Street Address" ref="location_input" value={this.state.newStreet} onChange={this.updateNewStreet} />
        <input type="text" className="location-list__zip-input" placeholder="Zip" value={this.state.newZip} onChange={this.updateNewZip} />
        <button className="location-list__add-button" onClick={this.handleAddNew}> Add Keyword</button>
      </div>
    )
  }
})

var ShowList = React.createClass({
  render: function(){
    
    var listItems = this.props.locations.map(function(location_array){
      return <li> {location_array[0]}, {location_array[1]}  <button className="check-map__button" >Check Map</button></li>
    })

    return (
      <div>
        <ul>
          {listItems}
        </ul>
      </div>
    )
  }
})

export default React.createClass({
  getInitialState: function(){
    return {
      location_array: []
    }
  },
  addLocation: function(address){
    this.state.location_array.push(address)
    this.setState({
      location_array: this.state.location_array
    })
  },
  render: function(){
    return (
      <div className="location-list" >
        <h3> Locations </h3>
        <ShowList locations={this.state.location_array} />
        <AddKeyword addNew={this.addLocation} />
      </div>
    )
  }
})