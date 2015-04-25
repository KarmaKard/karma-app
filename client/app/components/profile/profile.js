import React from 'react'
import LocationList from './js/location_list'
import KeyWordList from './js/keyword_list'

var NavButton =  React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  buttonClicked(e){
    e.preventDefault()
    this.context.router.transitionTo('deal_builder')
  },
  render() {
    return(
      <div className="navbuttons">
        <button className="navbuttons__button" onClick={this.buttonClicked} >Save</button>
        <button className="navbuttons__button">Skip</button>
      </div>
    )
  }
})

var GeneralInfo =  React.createClass({
  render() {
    return(
     <div className="general-info">
       <img className="general-info__logo" src="" alt="logo" />
       <div className="general-info__text">
         <input type="text" className="general-info__text__org-name" placeholder="Business Name" />
         <textarea type="text" className="general-info__text__org-desc" placeholder="Business Description" />
       </div>
     </div>
    )
  }
})

var CheckMap = React.createClass({
  render() {
    return (
      <div className="check-map">
        <p className="check-map__text">Verify if location(s) shows up correctly on the map</p>
        <button className="check-map__button">Check Map</button>
      </div>
    )
  }
})


export default React.createClass({

  onSubmit(event) {
    event.preventDefault()
    var name = this.refs.businessNameInput.getDOMNode().value
  },
  
  render: function() {
    return (
      <div className="pagewrap">
      
        <NavButton />
        
        <h2>Business Profile Builder</h2>
        
        <GeneralInfo />
        
        <KeyWordList />
        
        <LocationList />
        
        <CheckMap />
          
      </div>
    )
  }
})
