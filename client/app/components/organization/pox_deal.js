import React from 'react'
import { flux } from '../../main'

export default React.createClass({
  render() {
    return(
        <div className="bxx_deal">
          <div className="deal_header">Percentage Off</div>
          <div className="deal_contents">
            <div className="deal-row">
              <div className="required_amount">
                <span className="deal_text-left">Get</span> 
                <select className="deal-select">
                  <option>25%</option>
                  <option>30%</option>
                  <option>40%</option>
                  <option>50%</option>
                  <option>60%</option>
                  <option>70%</option>
                  <option>75%</option>
                  <option>80%</option>
                  <option selected>90%</option>
                </select>
              </div>
              <span className="deal_text-right">Off</span>
            </div>
          
            <div className="deal-row">
              <span className="deal_text2-left">Purchase of: </span> 
              <input className="deal-input" placeholder="Purchase Item Requirement "></input> 
            </div>
          
            <div className="deal_limit">
              <span className="deal_text-left">Limit</span> 
              <select className="karma_select">
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
              <span className="deal_text-left" >Dollar Value</span>
              <input className="karma_input dollar_value-input" placeholder="Value"></input> 
            </div>
          </div>
      </div>
    )
  }
})