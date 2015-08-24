import React from 'react'

export default React.createClass({
  propTypes: {
    setAmount: React.PropTypes.func.isRequired
  },

  getInitialState () {
    return {
      cardAmount: 1
    }
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  setCardAmount (e) {
    this.setState({
      cardAmount: e.target.value
    })
  },

  setAmount () {
    var cardAmount = parseInt(React.findDOMNode(this.refs.cardAmount).value, 10)
    var donationAmount = React.findDOMNode(this.refs.donationAmount).value

    if (cardAmount * 30 > donationAmount) {
      React.findDOMNode(this.refs.donationAmount).style.border = '3px solid rgb(242, 29, 29)'
      return
    }
    var amount = {
      cardAmount: cardAmount,
      donationAmount: donationAmount
    }
    this.props.setAmount(amount)
  },

  removeValue () {
    React.findDOMNode(this.refs.donationAmount).removeAttribute('value')
  },

  render () {
    return (
      <div>
        <div className='organization_information' >
          <div className='content_box-header'>Donation Amount</div>
          <h2>How many cards?</h2>
          <select ref='cardAmount' className='karma_select' onChange={this.setCardAmount} defaultValue='1'>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            <option value='6'>6</option>
            <option value='7'>7</option>
            <option value='8'>8</option>
            <option value='9'>9</option>
            <option value='10'>10</option>
          </select>
          <h2>Donation Amount</h2>
          <h3>Minimum Donation: ${this.state.cardAmount * 30}</h3>
          <input ref='donationAmount' className='karma_input' defaultValue={this.state.cardAmount * 30}></input>
          <h2>Dollars</h2>
          <button className='karma_button' onClick={this.setAmount} value='Next'>Next</button>
        </div>
      </div>
    )
  }
})
