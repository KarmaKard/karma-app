import React from 'react'


export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  buttonClicked (e){
    e.preventDefault()
    // Login to the server

    // if successful
    this.context.router.transitionTo('profile')
  },

  render: function() {
      var password = 'Password'
      return (
        <div className="login" >
          <form>
            <input type="text" className="login__input" value="email" />
            <input type="password" className="login__input" value={password} />
            <input type="submit" onClick={this.buttonClicked} className="login__button" value="Submit"/>
          </form>
       </div>
      )
  }
})



