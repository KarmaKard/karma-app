import React from 'react'
import { Link } from 'react-router'

var NavButton =  React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  nextClicked(e){
    e.preventDefault()
    this.context.router.transitionTo('business_dashboard')
  },

  backClicked(e){
    e.preventDefault()
    this.context.router.transitionTo('profile_builder')
  },

  saveClicked(e){
    e.preventDefault()
  },

  render() {
    var saveButton
    var backButton
    if (this.props.isRegistration) {
      saveButton = <button className="navbuttons__button" onClick={this.nextClicked} >Next</button>
      backButton = <button className="navbuttons__button" onClick={this.backClicked} >Back</button>
    }
    else{
      saveButton = <button className="navbuttons__button" onClick={this.saveClicked} >Save</button>
    }

    return(
      <div className="navbuttons">
        {backButton}
        {saveButton}
      </div>
    )
  }
})

export default React.createClass({
  render(){
    return(
      <div className="page-wrap">
        <NavButton isRegistration={this.props.isRegistration} />
        <h2>Deal Builder</h2>
        <table className="deal-table">
          <tr className="deal-table__header">
            <th>Deal</th>
            <th>Value</th>
            <th>Limit</th>
          </tr>
          <tr className="deal-table__odd deal-table__BOGO">
            <td className="column-1">
              Get 1 
              <input className="deal-table__BOGO-input" placeholder="type item here"/> 
              free, just for showing up! 
            </td>
            <td className="column-2">
              $ <input className="deal-table__BOGO-value"/>
            </td>
            <td className="column-3">
              <select>
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
              </select></td> 
          </tr>
          <tr className="deal-table__even deal-table__FREE">
            <td className="column-1">
              Buy
              <select className="deal-table__FREE__dropdown">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
              <input className="deal-table__FREE__input"  placeholder="type item here"/>
              &nbsp;and get 1 free
            </td>
            <td className="column-2">
              $ <input className="deal-table__FREE-value"/>
            </td>
            <td  className="column-3">
              <select>
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
              </select></td> 
          </tr>
          <tr className="deal-table__odd deal-table__DISCOUNT">
            <td className="column-1">
              Buy 1
              <input className="deal-table__DISCOUNT__input" placeholder="type item here"/>
              and get 
              <select className="deal-table__DISCOUNT__dropdown2">
                <option>10%</option>
                <option>20%</option>
                <option>30%</option>
                <option>40%</option>
                <option>50%</option>
                <option>60%</option>
                <option>70%</option>
                <option>80%</option>
                <option>90%</option>
              </select>  off the 2nd
            </td>
            <td className="column-2">
              $ <input className="deal-table__DISCOUNT-value"/>
            </td>
            <td className="column-3"></td> 
          </tr>
          <tr className="deal-table__even deal-table__PLUS_ONE">
            <td className="column-1">
              Buy 1 <input placeholder="type Item A here" className="deal-table__PLUS_ONE-input1"/> <br/> and get   <input placeholder="type Item B here" className="deal-table__PLUS_ONE-input2"/> for free!
            </td>
            <td className="column-2">
              $ <input className="deal-table__BOGO-value"/>
            </td>
            <td className="column-3">1</td> 
          </tr>
        </table>
      </div>   
    )
  }
})
