import React from 'react'
import LocationList from './location_list'
import KeyWordList from './keyword_list'

var NavButton =  React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  nextClicked(e){
    e.preventDefault()
    this.context.router.transitionTo('deal_builder')
  },
  saveClicked(e){
    e.preventDefault()

  },
  render() {
    var saveButton
    //check if this is a registration to decided whether to include the skip button
    if (this.props.isRegistration) {
      saveButton = <button className="navbuttons__button" onClick={this.nextClicked} >Next</button>
    }
    else{
      saveButton = <button className="navbuttons__button" onClick={this.saveClicked} >Save</button>
    }

    return(
      <div className="navbuttons">
        {saveButton}
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

export default React.createClass({

  onSubmit(event) {
    event.preventDefault()
    var name = this.refs.businessNameInput.getDOMNode().value
  },
  
  render: function() {
   
    return (
      <div className="pagewrap">

        <NavButton isRegistration={this.props.isRegistration} />
        
        <h2>Business Profile Builder</h2>
        
        <GeneralInfo />
        
        <KeyWordList />
        
        <LocationList />
        
          
      </div>
    )
  }
})
