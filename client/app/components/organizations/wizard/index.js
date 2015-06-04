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
      step: 1,
      status: "inactive",
      user: {}
    }
  },

  componentWillMount() {
    if(this.props.user){
      this.setState({user: this.props.user})
    }
  },

  setType(type){
    this.setState({type, step: this.state.step + 1})
  },

  setName(name){
    if(this.state.type === 'fundraiser'){
      var { router } = this.context
      var user = this.state.user
      
      if(user.role === "customer"){
        user.role = "manager"
      }

      flux.actions.users.update(user)

      var organization = {
        type: 'fundraiser',
        name,
        category: 'fundraiser',
        logoURL: this.state.logoURL,
        status: this.state.status,
        teamMembers: []
      }

      flux.actions.organizations.create(router, organization)
    }
    else{
      var newState = { name, step: this.state.step + 1 }
      this.setState(newState)
    }
    
  },

  setCategory(category){
    var { router } = this.context
    var user = this.state.user

    this.setState({category, step: this.state.step + 1, user}, () => {
      //This is temporary skip of Logo Upoad portion and assumes
      //that we will have logo upload complete before fundraisers 
      //begin signing up. Remove once Logo Upload is complete
      if(user.role === "customer"){
        user.role = "manager"
      }

      flux.actions.users.update(user)

      var organization = {
        type: this.state.type,
        name: this.state.name,
        category: this.state.category,
        logoURL: this.state.logoURL,
        status: this.state.status
      }

      flux.actions.organizations.create(router, organization)
    })

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
