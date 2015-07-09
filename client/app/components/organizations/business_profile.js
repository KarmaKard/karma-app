import React from 'react'
import { flux } from '../../main'

export default React.createClass({
  getInitialState() {
    return {
      descriptionCounter: 150,
    }
  },

  componentWillMount(){
    var descriptionCharactersLeft, purposeCharactersLeft
    if(this.props.organization.description){
      this.setState({descriptionCounter: 150 - this.props.organization.description.length})
    }
    else{
      this.setState({descriptionCounter: 150})
    }
  },

  changeMade(){
    React.findDOMNode(this.refs.saveButton).style.border="3px solid rgb(242, 29, 29)"
  },

  saveProfile(){
    if(this.state.descriptionCounter > 150){
      React.findDOMNode(this.refs.descriptionCharacterCount).style.color="rgb(242, 29, 29)"
      return
    }
    var name = React.findDOMNode(this.refs.name).value
    var category = React.findDOMNode(this.refs.category).value
    var description = React.findDOMNode(this.refs.description).value
    var logo = React.findDOMNode(this.refs.logo).src
    var beginDate = new Date(parseInt(React.findDOMNode(this.refs.beginDate).value))
    var endDate = new Date(beginDate.getFullYear()+2, beginDate.getMonth())

    this.props.organization.name = name
    this.props.organization.category = category
    this.props.organization.description = description
    this.props.organization.logoURL = logo
    this.props.organization.beginDate = beginDate
    this.props.organization.endDate = endDate

    this.props.updateOrganization(this.props.organization)
    React.findDOMNode(this.refs.saveButton).style.border="3px solid rgb(75, 187, 44)"
  },

  descriptionCounter(e){
    this.setState({descriptionCounter: 150 - e.target.textLength})
  },

  getActivePeriod(){
    var date = new Date()
    var thisMonth = date.getMonth()
    var thisYear = date.getFullYear()
    var nextYear = thisYear + 1


    var beginDate1, beginDate2, beginDate1Text, beginDate2Text, endDate1Text, endDate2Text
    
    if(thisMonth < 3){
      beginDate1 = new Date(thisYear, 3)
      beginDate2 = new Date(thisYear, 6)
    }
    else if(thisMonth < 6){
      beginDate1 = new Date(thisYear, 6)
      beginDate2 = new Date(thisYear, 9)
    }
    else if(thisMonth < 9){
      beginDate1 = new Date(thisYear, 9)
      beginDate2 = new Date(nextYear, 0)
    }
    else {
      beginDate1 = new Date(thisYear, 0)
      beginDate2 = new Date(nextYear, 3)
    }

    var activePeriod = {
      beginDate1,
      beginDate2,
    }

    return activePeriod
  },

  changeDates(e){
    var beginDate = new Date(parseInt(e.target.value))
    var endDate = new Date(beginDate.getFullYear()+2, beginDate.getMonth())
    endDate = endDate.toDateString()
    this.setState({endDate})
    this.changeMade()
  },

  render() {
    var beginDateOptions = this.getActivePeriod()
    var beginDate = new Date(this.props.organization.beginDate)
    var endDate = new Date(this.props.organization.endDate)
    var endDateText
    if (this.state.endDate){endDateText = this.state.endDate}
    else if (endDate) {endDateText = endDate.toDateString()}
    else {endDateText = "End Date"}
    return (
      <div>
        <div className="content_box-header">Profile</div>
          <div className="deal_begin_date">
            <span className="deal_text-left">Period: From</span> 
            <select 
            onBlur={this.saveThisDeal} 
            onChange={this.changeDates} 
            defaultValue={beginDate.getTime()} 
            ref="beginDate" 
            className="karma_select begin_date-select"
            disabled={this.props.editDisabled}>
              <option>Select Begin Date</option>
              <option value={beginDateOptions.beginDate1.getTime()}>{beginDateOptions.beginDate1.toDateString()}</option>
              <option value={beginDateOptions.beginDate2.getTime()}>{beginDateOptions.beginDate2.toDateString()}</option>
            </select>
            <span className="deal-to_date" ref="endDate" defaultValue={endDate}>To</span> 
            {endDateText}
          </div>
          <span className="label-span">Name</span>
          <input
            type="text"
            ref="name"
            className="karma_input"
            onChange={this.changeMade}
            defaultValue={this.props.organization.name}
            disabled={this.props.editDisabled} />

          <span className="label-span">Category</span>
          <select 
            ref="category" 
            onChange={this.changeMade} 
            className="karma_input" 
            defaultValue={this.props.organization.category}
            disabled={this.props.editDisabled}>
            <option value="Dining">Dining</option>
            <option value="Entertainment"> Entertainment</option>
            <option value="Health & Fitness">Health & Fitness</option>
            <option value="Home & Garden">Home & Garden</option>
            <option value="Professional">Professional</option>
            <option value="Services">Services</option>
            <option value="Shopping">Shopping</option>
          </select>
          <span className="label-span">Business Description</span>
          <span ref="descriptionCharacterCount" className="profile_description-counter">{this.state.descriptionCounter}</span>
          <textarea
            ref="description"
            className="karma_input"
            placeholder="Write business description here."
            onChange={this.changeMade}
            onKeyUp={this.descriptionCounter}
            defaultValue={this.props.organization.description} 
            disabled={this.props.editDisabled}/>
          <span ref="logo" className="label-span"> Business Logo</span>
          <img className="organization_profile-logo" src="/img/logo-placeholder.png" alt="logo" height="100" width="100" />
          <button ref="saveButton" className="karma_button" onClick={this.saveProfile} disabled={this.props.editDisabled}>Save</button>
      </div>
    )
  }
})
