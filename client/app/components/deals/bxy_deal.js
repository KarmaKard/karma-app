import React from 'react'
import { flux } from '../../main'

export default React.createClass({
  saveThisDeal(){
    var primaryProductName = React.findDOMNode(this.refs.primaryProductName).value
    var primaryUsageLimit = React.findDOMNode(this.refs.primaryUsageLimit).value
    var secondaryProductName = React.findDOMNode(this.refs.secondaryProductName).value
    var secondaryUsageLimit = React.findDOMNode(this.refs.secondaryUsageLimit).value
    var limit = React.findDOMNode(this.refs.limit).value
    var dollarValue = React.findDOMNode(this.refs.dollarValue).value

    if (!primaryProductName || !primaryUsageLimit || !secondaryProductName || !secondaryUsageLimit || !limit || !dollarValue ) {
      return null
    }

    var deal = {
      primaryProductName,
      primaryUsageLimit,
      secondaryProductName,
      secondaryUsageLimit,
      limit,
      dollarValue,
      type: "BXY"
    } 

    deal.dealText = "Buy " + primaryUsageLimit + " "+ primaryProductName + ", get " + secondaryUsageLimit + " " + secondaryProductName + " Free!"
    
    if(this.props.deal){
      deal.id = this.props.deal.id
    }    
    this.props.saveDeal(deal)
  },

  deleteClicked() {
    flux.actions.deals.deleteDeal(this.props.deal)
  },
  
  render() {
    if (!this.props.deal){
      return <span />
    }
    var primaryProductName = this.props.deal.primaryProductName
    var primaryUsageLimit = this.props.deal.primaryUsageLimit
    var secondaryProductName = this.props.deal.secondaryProductName
    var secondaryUsageLimit = this.props.deal.secondaryUsageLimit
    var limit = this.props.deal.limit
    var dollarValue = this.props.deal.dollarValue


    return(
      <div className="bxx_deal">
        <div className="deal_header">
          Buy X Get Y
          <button className="deal-delete" onClick={this.deleteClicked} disabled={this.props.editDisabled}>Delete</button>
        </div>
        <div className="deal_contents">
          <div className="deal-row">
            <div className="required_amount">
              <span className="deal_text-left">Buy</span> 
              <select 
                ref="primaryUsageLimit" 
                onBlur={this.saveThisDeal}
                onChange={this.props.changeMade}  
                defaultValue={primaryUsageLimit} 
                className="karma_select"
                disabled={this.props.editDisabled}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
            <input 
              className="deal-input" 
              ref="primaryProductName" 
              onBlur={this.saveThisDeal} 
              onChange={this.props.changeMade} 
              defaultValue={primaryProductName}
              placeholder="Purchase Requirement Item X" 
              disabled={this.props.editDisabled}/>
          </div>
          <div className="deal-row">
            <div className="required_amount">
              <span className="deal_text2-left">Get </span> 
              <select 
                ref="secondaryUsageLimit" 
                onBlur={this.saveThisDeal}
                onChange={this.props.changeMade}  
                defaultValue={secondaryUsageLimit} 
                className="karma_select"
                disabled={this.props.editDisabled}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
            <input 
              className="deal-input" 
              ref="secondaryProductName" 
              onBlur={this.saveThisDeal} 
              onChange={this.props.changeMade} 
              defaultValue={secondaryProductName} 
              placeholder="Free Item Y "
              disabled={this.props.editDisabled}/>
            <span className="deal_text-right">Free</span>
          </div>
          <div className="deal_limit">
            <span className="deal_text-left">Limit</span> 
            <select 
              ref="limit" 
              onBlur={this.saveThisDeal} 
              onChange={this.props.changeMade} 
              defaultValue={limit} 
              className="karma_select"
              disabled={this.props.editDisabled}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
              <option selected>unlimited</option>
            </select>
          </div>
          <div className="dollar_value">
            <span className="deal_text-left">Dollar Value of Single Usage  $</span>
            <input 
              ref="dollarValue" 
              onBlur={this.saveThisDeal} 
              onChange={this.props.changeMade} 
              defaultValue={dollarValue} 
              placeholder="00.00"
              className="karma_input dollar_value-input"
              disabled={this.props.editDisabled}></input> 
          </div>
        </div>
        <hr/>
      </div>
    )
  }
})
