import React from 'react'
import Router, {RouteHandler, Link} from 'react-router'
import { flux } from '../../../main'
import WizardType from './wizard_type'
import WizardName from './wizard_name'
import WizardCategory from './wizard_category'
import WizardLogo from './wizard_logo'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState() {
    return {
      type: null,
      name: null,
      category: null,
      logoURL: null,
      step: 1
    }
  },

  setType(type){
    this.setState({type, step: this.state.step + 1})
  },

  setName(name){
    var newState = { name, step: this.state.step + 1 }
    if(this.state.type === 'fundraiser'){
      newState.category = 'fundraiser'
    }
    this.setState(newState)
  },

  setCategory(category){
    this.setState({category, step: this.state.step + 1})
  },

  setLogo(logoURL){
    var { router } = this.context
    this.setState({logoURL, step: this.state.step + 1}, () => {
      flux.actions.organizations.create(router, this.state)
    })
  },

  getWizardComponent() {
    switch(this.state.step) {
      case 1:
        return <WizardType 
                setType={this.setType}/>
        break
      case 2:
        return <WizardName 
                orgType={this.state.type}
                setName={this.setName}/>
        break
      case 3:
        if (this.state.type === 'business') {
          return <WizardCategory
                  setCategory={this.setCategory}/>
        } // Fall-through to next if fundraiser
      default:
        return <WizardLogo 
                orgType={this.state.type}
                setLogo={this.setLogo}/>
        break
    }
  },

  render(){
    return this.getWizardComponent()
  }
})
