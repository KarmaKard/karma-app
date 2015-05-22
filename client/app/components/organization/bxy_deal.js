import React from 'react'
import { flux } from '../../main'

export default React.createClass({
  render() {
    return(
        <div className="bxx_deal">
          <div className="deal_header">Buy X Get Y</div>
          <div className="deal_contents">
            <div className="deal-row">
              <div className="required_amount">
                <span className="deal_text-left">Buy</span> 
                <select className="karma_select">
                  <option selected>1</option>
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
              <input className="deal-input" placeholder="Type Purchase Requirement Item X"></input> 
            </div>
          
            <div className="deal-row">
              <div className="required_amount">
                <span className="deal_text2-left">Get </span> 
                <select className="karma_select">
                  <option selected>1</option>
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
              <input className="deal-input" placeholder="Type Item Similar to Item Y Above "></input> 
              <span className="deal_text-right">Free</span>
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
              <span className="deal_text-left">Dollar Value</span>
              <input className="karma_input dollar_value-input"></input> 
            </div>
          </div>
      </div>
    )
  }
})