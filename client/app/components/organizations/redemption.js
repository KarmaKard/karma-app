import React from 'react'
import { flux } from '../../main'

export default React.createClass({
  getInitialState () {
    return {
      amountSaved: null
    }
  },

  propTypes: {
    organization: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
    saveAmountSaved: React.PropTypes.func.isRequired
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  redeem () {
    var amountSaved = this.state.amountSaved / 100
    var redemption = {
      dealId: this.context.router.getCurrentParams().dealId,
      paymentId: this.context.router.getCurrentParams().paymentId,
      organizationId: this.props.organization.id,
      userId: this.props.user.id,
      amountSaved
    }
    this.props.saveAmountSaved(amountSaved)

    var { router } = this.context
    flux.actions.deals.createRedemption(router, redemption)
  },

  keyPressed (e) {
    var keyPressed = e.target.innerHTML
    
    switch (keyPressed) {
      case 'Clear':
         this.setState({amountSaved: ''})
         break
      case 'Back':
        var amountSaved = Math.floor(this.state.amountSaved / 1e1)
        this.setState({amountSaved})
        break
      default:
        if (!this.state.amountSaved) {
          this.setState({amountSaved: keyPressed})
        } else {
          var currentAmount = this.state.amountSaved
          amountSaved = parseFloat('' + currentAmount + keyPressed)
          this.setState({amountSaved})
        }
    }
  },

  render () {
    return (
      <div>
        <p>Give your device to the clerk and the clerk will input how much you have saved to verify the discount.</p>

        <input ref='amountSaved' className='karma_input' value={'$' + (this.state.amountSaved / 100).toFixed(2)}/>
        <div className='dialpad'>
          <button onClick={this.keyPressed} className='dialpad-element'>1</button>
          <button onClick={this.keyPressed} className='dialpad-element'>2</button>
          <button onClick={this.keyPressed} className='dialpad-element'>3</button>
          <button onClick={this.keyPressed} className='dialpad-element'>4</button>
          <button onClick={this.keyPressed} className='dialpad-element'>5</button>
          <button onClick={this.keyPressed} className='dialpad-element'>6</button>
          <button onClick={this.keyPressed} className='dialpad-element'>7</button>
          <button onClick={this.keyPressed} className='dialpad-element'>8</button>
          <button onClick={this.keyPressed} className='dialpad-element'>9</button>
          <button onClick={this.keyPressed} className='dialpad-element'>0</button>
          <button onClick={this.keyPressed} className='dialpad-element'>Clear</button>
          <button onClick={this.keyPressed} className='dialpad-element'>Back</button>
        </div>
        <button className='karma_button' onClick={this.redeem}>Redeem Deal</button>
      </div>
      )
  }
})
