import React from 'react'
import { flux } from '../../main'

export default React.createClass({
  render() {
  
    return (
      <div>
        <div className="content_box-header">Deals</div>
        One free deal and one or more paid deal(s) are required
        <div className="free_deal">
          <div className="deal_header">Free Deal</div>
            <div className="deal_contents">
            <span className="deal_text-left">Get</span> 
            <input className="karma_input free_deal_input"></input> 
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
        </div>
        <hr/>
        <div className="deal_header">Paid Deal</div>
        <span className="deal_text-left">Select Deal Type:</span>
        <select className="karma_select">
          <option selected>Select Deal</option> 
          <option>Buy # of X get 1 X Free</option>
          <option>Buy X get Y Free</option>
          <option>Get $# off</option>
          <option>Get #% off</option>
          <option></option>
        </select>
      </div>
    )
  }
})
