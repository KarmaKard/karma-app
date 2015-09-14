import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { flux } from '../../main'
import {Link} from 'react-router'
import mui from 'material-ui'
import {AppBar, FlatButton, Card, CardTitle, TextField, RaisedButton} from 'material-ui'
let Colors = mui.Styles.Colors
var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({
  getDefaultProps () {
    return {
      loginErrors: []
    }
  },

  getInitialState () {
    return {
      disabledLogin: false
    }
  },

  propTypes: {
    loginErrors: React.PropTypes.array.isRequired,
    userLogin: React.PropTypes.func.isRequired,
    setFbLogin: React.PropTypes.func.isRequired
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },

  componentDidMount () {
    (function (d, s, id) {
      var js
      var fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) return
      js = d.createElement(s)
      js.id = id
      js.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4&appId=550843868397495'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))
  },

  getInfo () {
    var setFbLogin = this.props.setFbLogin
    FB.api('/me', {fields: 'email, first_name, last_name'}, function (response) {
      var user = {
        firstName: response.first_name,
        lastName: response.last_name,
        email: response.email,
        fbUserId: response.id
      }
      setFbLogin(user)
    })
  },

  statusChangeCallback (response) {
    if (response.status === 'connected') {
      this.getInfo()
    } else if (response.status === 'not_authorized') {

    } else {

    }
  },

  fbChromeiOSLogin () {
    FB.getLoginStatus(function (response) {
      this.statusChangeCallback(response)
    }, true)
  },

  handleClick () {
      // fix iOS Chrome
    if (navigator.userAgent.match('CriOS')) {
      alert('May experience issues with Chrome iOS FB Login')
    }

    FB.login(function (response) {
      this.statusChangeCallback(response)
    }.bind(this),
    {
     scope: 'public_profile, email',
     return_scopes: true
    })
  },

  didLogin (e) {
    e.preventDefault()
    this.setState({disableLogin: true})
    var email = this.state.email
    var password = this.state.password

    flux.actions.users.clearLoginErrors()
    this.props.userLogin(email, password)
  },

  setPassword (e) {
    this.setState ({
      password: e.target.value
    })
  },

  setEmail (e) {
    this.setState ({
      email: e.target.value
    })
  },

  render() {
    injectTapEventPlugin()
    var loginErrorMessage = this.props.loginErrors.length !== 0
      ? <div className='karma_error'>Incorrect Credentials</div>
      : null

    var disabledLogin = this.state.disabledLogin 
      ? <RaisedButton 
          className='raisedButton login_button' 
          primary={true} 
          fullWidth={true} 
          onClick={this.didLogin} 
          label="Login" 
          disabled={true}
          style={{
            margin: '15px 0 0 0'
          }}/>
      : <RaisedButton 
          primary={true} 
          fullWidth={true} 
          onTouchTap={this.didLogin} 
          className='raisedButton login_button' 
          label="Login" 
          style={{
            margin: '15px 0 0 0'
          }}/>

    var forgotPassword = this.props.loginErrors.length !== 0
      ? (<TextField
            onBlur={this.setPassword}
            ref='password'
            fullWidth={true}
            type='password'
            floatingLabelText='Password'
            errorText=<Link to='password_reset'>Forgot Password?</Link> />)
      : (<TextField
            onBlur={this.setPassword}
            ref='password'
            fullWidth={true}
            type='password'
            floatingLabelText='Password' />)

    return (
      <div>
          <CardTitle className='cardTitle'  title='Login'/>
          {loginErrorMessage}
            <TextField
              onBlur={this.setEmail}
              ref='email'
              hintText='example@karmakard.org'
              fullWidth={true}
              type='email'
              floatingLabelText='Email' />
            {forgotPassword}
            {disabledLogin}

          <RaisedButton primary={true}  onClick={this.handleClick} style={{margin: '30px auto'}} className='fb_button' fullWidth={true}>
            <i style={{color: '#3A5795', margin: '4px 47%', float: 'left'}} className='fa fa-facebook fa-2x fa-inverse'></i>
          </RaisedButton>

          <hr style={{margin: '10px 0'}} />

          <Link to='join_options' >
            <RaisedButton className='raisedButton' primary={true}  style={{margin: '30px auto'}} label="New User?"  fullWidth={true}>
            </RaisedButton>
          </Link>
      </div>
    )
  }
})
