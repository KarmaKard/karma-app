import React from 'react'
import { flux } from '../../main'

export default React.createClass({
  saveThisDeal(){
    var primaryProductName = React.findDOMNode(this.refs.primary).value
    var limit = React.findDOMNode(this.refs.limit).value
    var dollarValue = React.findDOMNode(this.refs.dollarValue).value

    if (!primaryProductName || !limit || !dollarValue) {
      return null
    }

    var deal = {
      primaryProductName,
      limit,
      dollarValue,
      type: "Free"
    } 

    deal.dealText = "Get " + primaryProductName + " Free"
    
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

    var primaryProduct = this.props.deal.primaryProductName
    var limit = this.props.deal.limit
    var dollarValue = this.props.deal.dollarValue

    return(
      <div className="free_deal">
        <div className="deal_header">Free Deal
          <button className="deal-delete" onClick={this.deleteClicked} disabled={this.props.editDisabled}>Delete</button>
        </div>

          <div className="deal_contents">
          <span className="deal_text-left">Get</span> 
          <input 
            ref="primary" 
            type="text"
            onBlur={this.saveThisDeal} 
            onChange={this.props.changeMade} 
            defaultValue={primaryProduct} 
            className="deal-input"
            placeholder="Type Item Here" 
            disabled={this.props.editDisabled}/>
          <span className="deal_text-right">Free</span>
        </div>
        <div className="deal_limit">
          <span className="deal_text-left">Limit</span> 
          <select 
            onBlur={this.saveThisDeal} 
            onChange={this.props.changeMade} 
            defaultValue={limit} 
            ref="limit" 
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
            <option value="unlimited">unlimited</option>
          </select>
        </div>
        <div className="dollar_value">
          <span className="deal_text-left">Dollar Value of Single Usage  $</span>
          <input 
            onBlur={this.saveThisDeal} 
            onChange={this.props.changeMade} 
            defaultValue={dollarValue} 
            ref="dollarValue" 
            placeholder="00.00"
            className="karma_input dollar_value-input"
            disabled={this.props.editDisabled}/>
        </div>
        <hr/>
      </div>
    )
  }
})