import React from 'react'
import Router, {RouteHandler, Link} from 'react-router'
import { flux } from '../../../main'
import WizardType from '../wizard_type'
import WizardName from '../wizard_name'
import WizardCategory from '../wizard_category'
import WizardLogo from '../wizard_logo'

var organizationInformation = {
}

export default React.createClass({
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
    this.setState({name, step: this.state.step + 1})
  },

  setCategory(category){
    this.setState({category, step: this.state.step + 1})
  },

  setLogo(logoURL){
    this.setState({logURL, step: this.state.step + 1})
    flux.actions.organizations.create(router, this.state)
  },

  getWizardComponent() {
    console.log(this.state)
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
    var component = this.getWizardComponent()

    return (
      <div>
        <div className="page_header">
          <div className="page_header_title">KarmaKard</div>
        </div>
        <div className="content_box">
          {component}
        </div>
      </div>
    )     
  }
})
