import React from 'react'
import Router, {RouteHandler} from 'react-router'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  profile_NextClicked(e){
    e.preventDefault()
    alert(nextView)
    this.context.router.transitionTo('deal_builder')
  },
  deals_NextClicked(e){
    e.preventDefault()
    alert(nextView)
    this.context.router.transitionTo('dashboard')
  },
  render: function(){
    var NextButtonLink
    if(this.props.registrationView === "profile"){
      NextButtonLink = <button className="navbuttons__button" onClick={this.profile_NextClicked} >Next</button>
    }
    else if (this.props.registrationView === "deals"){
      NextButtonLink = <button className="navbuttons__button" onClick={this.deals_NextClicked} >Next</button>
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
