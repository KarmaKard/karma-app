import React from 'react'
import Router, {RouteHandler, Link} from 'react-router'
import { flux } from '../../../main'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState() { 
    return { wizard: flux.stores.wizard.getState()} 
  },

  storeChange() {
    this.setState({
      wizard: flux.stores.wizard.getState()
    })
  },
  componentWillMount() {
    flux.stores.wizard.addListener('change', this.storeChange)
  },
  componentWillUnmount() {
    flux.stores.wizard.removeListener('change', this.storeChange)
  },
  setType(type) {
    var { router } = this.context
    flux.actions.wizard.saveType(router, type)
  },
  setName(name) {
    this.setState({
      organizationName : name
    })
    if(this.state.organizationType === "Business"){
      this.context.router.transitionTo('wizard_category')
    } 
    else{
      this.context.router.transitionTo('wizard_logo')
    }  
  },
  render(){
    console.log(this.state)
    return(
      <div>
        <div className="page_header">
          <div className="page_header_title">KarmaKard</div>
        </div>
        <div className="content_box">
          <RouteHandler 
            setType={this.setType} 
            setName={this.setName}
            organizationType={this.state.wizard.organizationType} />
        </div>
      </div>
    )
  }
})
