import React from 'react'

export default React.createClass({

  propTypes: {
    createToken: React.PropTypes.func.isRequired
  },

  didClick (e) {
    e.preventDefault()
    React.findDOMNode(this.refs.button).disabled = true

    var info = {
      cardNumber: React.findDOMNode(this.refs.cardNumber).value,
      cvc: React.findDOMNode(this.refs.cvc).value,
      expirationMonth: React.findDOMNode(this.refs.expirationMonth).value,
      expirationYear: React.findDOMNode(this.refs.expirationYear).value
    }
    this.props.createToken(info)
    React.findDOMNode(this.refs.button).disabled = false
  },

  render () {
    return (
      <div className='register' >
        <div>
            <div className='content_box-header'>Donation</div>
            <form action='' method='POST' id='payment-form'>
              <h2>Card Information</h2>
              <div className='form-row'>
                <label>
                  <span>Card Number</span>
                  <input type='text' ref='cardNumber' className='karma_input' placeholder='Credit Card Number' />
                </label>
              </div>

              <div className='form-row'>
                <label>
                  <span>CVC</span>
                  <input type='text' ref='cvc' className='karma_input' placeholder='CVC' />
                </label>
              </div>

              <div className='form-row'>
                <label>
                  <span>Exp Month</span>
                  <input type='text' ref='expirationMonth' className='karma_input' size='2' placeholder='MM' />
                </label>
              </div>

              <div className='form-row'>
                <label>
                  <span>Exp Year</span>
                  <input type='text' ref='expirationYear' className='karma_input' size='4' placeholder='YYYY' />
                </label>
              </div>
              <button ref='button' onClick={this.didClick} className='karma_button'>Submit</button>
            </form>
          </div>
      </div>
    )
  }
})