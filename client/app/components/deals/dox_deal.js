import React from 'react'
import { flux } from '../../main'

export default React.createClass({
   saveThisDeal(){
    var primaryProductName = React.findDOMNode(this.refs.primaryProductName).value
    var limit = React.findDOMNode(this.refs.limit).value
    var dollarValue = React.findDOMNode(this.refs.dollarValue).value

    if (!primaryProductName || !limit || !dollarValue) {
      return null
    }

    var deal = {
      primaryProductName,
      limit,
      dollarValue,
      type: "DOX"
    } 
    
    if(this.props.deal){
      deal.id = this.props.deal.id
    }    
    this.props.saveDeal(deal)
  },

  render() {
    if (!this.props.deal){
      return <span />
    }

    var primaryProductName = this.props.deal.primaryProductName
    var limit = this.props.deal.limit
    var dollarValue = this.props.deal.dollarValue

    return(
      <div className="bxx_deal">
        <div className="deal_header">
          Dollars Off
        </div>
        <div className="deal_contents">
          <div className="deal-row">
            <div className="required_amount">
              <span className="deal_text-left">Get</span> 
              <input 
                ref="dollarValue" 
                className="deal-input dollar_value-input" 
                placeholder="Value"
                onBlur={this.saveThisDeal} 
                onChange={this.props.changeMade} 
                defaultValue={dollarValue} />
            </div>
            <span className="deal_text-right">Dollars Off</span>
          </div>
          <div className="deal-row">
            <span className="deal_text2-left">Purchase of: </span> 
            <input 
              ref="primaryProductName" 
              className="deal-input" 
              placeholder="Purchase Item Requirement"
              onBlur={this.saveThisDeal} 
              onChange={this.props.changeMade} 
              defaultValue={primaryProductName} /> 
          </div>
          <div className="deal_limit">
            <span className="deal_text-left">Limit</span> 
            <select 
              ref="limit" 
              className="karma_select"
              onBlur={this.saveThisDeal}
              onChange={this.props.changeMade}  
              defaultValue={limit}>
              <option>unlimited</option>
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
            </select>
          </div>
        </div>
        <hr />
      </div>
    )
  }
})
