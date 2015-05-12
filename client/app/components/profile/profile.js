import React from 'react'
import { flux } from '../../main'
import LocationList from './location_list'
import KeyWordList from './keyword_list'

var NavButton =  React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  nextClicked(e){
    e.preventDefault()
    if (this.props.onNext) {
      this.props.onNext(e)
    }
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

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  
  onSubmit(event) {
    event.preventDefault()
    var name = this.refs.businessNameInput.getDOMNode().value
  },

  nextClicked(e) {

    var { router } = this.context
 
    var name = React.findDOMNode(this.refs.name).value
    var description = React.findDOMNode(this.refs.description).value
    var keywords = this.refs.keyword_list.getKeywords()

    var business = { name, description, keywords }

    flux.actions.business.create(router, business)
  },

  render() {
    return (
      <div className="pagewrap">
        <NavButton onNext={this.nextClicked} isRegistration={this.props.isRegistration} />
        <h2>Business Profile Builder</h2>
        <div className="general-info">
         <img className="general-info__logo" src="" alt="logo" />
         <div className="general-info__text">
           <input type="text" ref="name" className="general-info__text__org-name" placeholder="Business Name" />
           <textarea type="text" ref="description" className="general-info__text__org-desc" placeholder="Business Description" />
         </div>
        </div>
        <KeyWordList ref="keyword_list" />
        <LocationList />
      </div>
    )
  }
})
