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
    
    if(this.props.freeDeal){
      deal.id = this.props.freeDeal.id
    }    

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
            defaultValue={primaryProduct} 
            className="deal-input"
            placeholder="Type Item Here" />
          <span className="deal_text-right">Free</span>
        </div>
        <div className="deal_limit">
          <span className="deal_text-left">Limit</span> 
          <select onBlur={this.saveThisDeal} defaultValue={limit} ref="limit" className="karma_select">
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
            <option>unlimited</option>
          </select>
        </div>
        <div className="dollar_value">
          <span className="deal_text-left">Dollar Value</span>
          <input onBlur={this.saveThisDeal} defaultValue={dollarValue} ref="dollarValue" className="karma_input dollar_value-input"></input> 
        </div>
        <hr/>
      </div>
    )
  }
})
