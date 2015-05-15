import React from 'react'
import Router, {RouteHandler, Link} from 'react-router'
import { flux } from '../../../main'
import OrganizationType from '../organization_type'
import OrganizationName from '../organization_name'
import OrganizationCategory from '../organization_category'
import OrganizationLogo from '../organization_logo'

var organizationInformation = {
  type: null,
  name: null,
  category: null,
  logoURL: null
}

export default React.createClass({
  getInitialState() {
    return {
      step : 1
    }
  },
  setType(type){
    organizationInformation.type = type
  },
  setName(name){
    organizationInformation.name = name
  },
  setCategory(category){
    organizationInformation.category = category
  },
  setLogo(url){
    organizationInformation.logoURL = url
  },
  nextStep() {
    if (organizationInformation.type == "Fundraiser" && this.state.step == 2){
      console.log(this.state.step)
      this.setState({
        step : this.state.step + 2
      })
      console.log(this.state.step)
    }
    else{
      this.setState({
        step : this.state.step + 1
      })
    }
    
  },

  render(){
    var componenent
    switch(this.state.step) {
      case 1:
        componenent = <OrganizationType 
                        organizationInformation={organizationInformation}
                        nextStep={this.nextStep}
                        setType={this.setType}/>
        break
      case 2:
        componenent = <OrganizationName 
                        organizationInformation={organizationInformation}
                        nextStep={this.nextStep}
                        setName={this.setName}/>
        break
      case 3:
        componenent = <OrganizationCategory 
                        organizationInformation={organizationInformation}
                        nextStep={this.nextStep}
                        setCategory={this.setCategory}/>
        break
      case 4:
        componenent = <OrganizationLogo 
                        organizationInformation={organizationInformation}
                        nextStep={this.nextStep}
                        setLogo={this.setLogo}/>
        break
    }

    return (
      <div>
        <div className="page_header">
          <div className="page_header_title">KarmaKard</div>
        </div>
        <div className="content_box">
          {componenent}
        </div>
      </div>
    )     
  }
})
