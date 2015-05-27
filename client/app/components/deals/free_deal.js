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
      primaryProductName: primaryProductName,
      limit: limit,
      dollarValue: dollarValue,
      type: "Free"
    } 
    
    if(this.props.deal){
      deal.id = this.props.deal.id
    }    
    console.log(deal)
    this.props.saveDeal(deal)
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
        <div className="deal_header">Free Deal</div>
          <div className="deal_contents">
          <span className="deal_text-left">Get</span> 
          <input 
            ref="primary" 
            type="text"
            onBlur={this.saveThisDeal} 
            onChange={this.props.changeMade} 
            defaultValue={primaryProduct} 
            className="deal-input"
            placeholder="Type Item Here" />
          <span className="deal_text-right">Free</span>
        </div>
        <div className="deal_limit">
          <span className="deal_text-left">Limit</span> 
          <select 
            onBlur={this.saveThisDeal} 
            onChange={this.props.changeMade} 
            defaultValue={limit} 
            ref="limit" 
            className="karma_select">
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
          <span className="deal_text-left">Dollar Value</span>
          <input 
            onBlur={this.saveThisDeal} 
            onChange={this.props.changeMade} 
            defaultValue={dollarValue} 
            ref="dollarValue" 
            className="karma_input dollar_value-input"/>
        </div>
        <hr/>
      </div>
    )
  }
})