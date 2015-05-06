import React from 'react'


export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  loginClicked (e){
    e.preventDefault()
    // Login to the server

    // if successful

    this.context.router.transitionTo('dashboard')
  },
  registerClicked (e){
    e.preventDefault()
    // Login to the server

    // if successful
    this.context.router.transitionTo('profile_builder')
  },

  render: function() {
    return (
      <div className="loginwrap"> 
        <div className="login" >
          <h2>Login</h2>
          <form>
            <input type="text" className="login__input" placeholder="Email" />
            <input type="password" className="login__input" placeholder="Password" />
            <input type="submit" onClick={this.loginClicked} className="login__button" value="Submit"/>
          </form>
        </div>
        <div className="register" >
          <h2>Register</h2>
          <form>
            <input type="text" className="register__input" placeholder="Email"/>
            <input type="password" className="register__input" placeholder="Password" />
            <input type="password" className="register__input" placeholder="Confirm Password" />
            <input type="submit" onClick={this.registerClicked} className="register__button" value="Submit"/>
          </form>
         </div>
      </div>
    )
  }
})
