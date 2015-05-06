import React from 'react'
import Router, {RouteHandler} from 'react-router'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  profileNextClicked(e){
    e.preventDefault()
    this.context.router.transitionTo('deal_builder')
  },
  dealsNextClicked(e){
    e.preventDefault()
    this.context.router.transitionTo('dashboard')
  },
  render(){
    var NextButtonLink
    if(this.props.registrationView === "profile"){
      NextButtonLink = <button className="navbuttons__button" onClick={this.profileNextClicked} >Next</button>
    }
    else if (this.props.registrationView === "deals"){
      NextButtonLink = <button className="navbuttons__button" onClick={this.dealsNextClicked} >Next</button>
    }
    return(
      <div>
        <div className="registration__header__stripe"> 
          <div className="registration__header__title">Registration</div>
        </div>
        {NextButtonLink}
        <RouteHandler />
      </div>
    )
  }

})
