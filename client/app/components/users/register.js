import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import mui from 'material-ui'
import {CardTitle, TextField, RaisedButton} from 'material-ui'

var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  propTypes: {
    setFbLogin: React.PropTypes.func.isRequired,
    createUser: React.PropTypes.func.isRequired
  },

  getInitialState () {
    return {
      mismatchPasswords: false,
      incorrectEmail: false,
      disabledRegister: false,
      passwordConfirmMessage: null,
      passwordConfirmColor: null
    }
  },

  componentDidMount () {

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) return
      js = d.createElement(s)
      js.id = id
      js.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4&appId=550843868397495'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },

  getInfo () {
    var {router} = this.context
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

  handleFbClick () {
      // fix iOS Chrome
    if (navigator.userAgent.match('CriOS')) {
      alert("Chrome on iOS doesn't like facebook login. Try Safari.")
    }

    FB.login(function (response) {
      this.statusChangeCallback(response)
    }.bind(this),
    {
     scope: 'public_profile, email',
     return_scopes: true
    })
  },

  registerClicked () {
    this.setState({disabledRegister: true})
    var email = this.state.email
    var firstName = this.state.firstName
    var lastName = this.state.lastName
    var password = this.state.password
    var passwordConfirm = this.state.passwordConfirm
    var roles = {}
    if (password && passwordConfirm && password !== passwordConfirm) {
      return this.setState({
        mismatchPasswords: true
      })
    }

    if (email) {
      var emailValidator = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/
      if (!emailValidator.test(email)) {
        return this.setState({
          incorrectEmail: true
        })
      }
    }

    var user = { email, firstName, lastName, password, roles}
    this.props.createUser(user)
    this.setState({disabledRegister: false})
  },

  setFirstName (e) {
    this.setState({
      firstName: e.target.value
    })
  },

  setLastName (e) {
    this.setState({
      lastName: e.target.value
    })
  },

  setEmail (e) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if( re.test(e.target.value)) {
      this.setState({incorrectEmail: 0})
      this.setState({email: e.target.value})
    }
    else {
      this.setState({incorrectEmail: 1})
    }
  },

  setPassword (e) {
    this.setState({password: e.target.value})
  },

  setPasswordConfirm (e) {
    var confirm = e.target.value
    if (this.state.password === e.target.value) {
      this.setState({passwordConfirmMessage: 'Perfect!', passwordConfirmColor: '#4CAF50', passwordConfirm: e.target.value})
    } else if (this.state.password.substring(0, e.target.value.length) === e.target.value) {
      this.setState({passwordConfirmMessage: 'Good. Keep Going...', passwordConfirmColor:'#4CAF50', passwordConfirm: e.target.value})
    } else {
      this.setState({passwordConfirmMessage: 'Mismatched', passwordConfirmColor: 'red', passwordConfirm: e.target.value})
    }
  },

  render() {
  injectTapEventPlugin()
    var mismatchPasswords = this.state.mismatchPasswords
      ? <div className='error-message'>Mismatched Passwords</div>
      : null

    var incorrectEmail = this.state.incorrectEmail
      ? <div className='error-message'>Not an Email Format</div>
      : null

    var disabledRegister = this.state.disabledRegister
      ? <RaisedButton
          fullWidth={true}
          onClick={this.registerClicked}
          className='raisedButton'
          label='Register'
          disabled={true}
          style={{
            margin: '15px 0 0 0'
          }}/>
      : <RaisedButton
          fullWidth={true}
          onClick={this.registerClicked}
          className='raisedButton'
          label='Register'
          style={{
            margin: '15px 0 0 0'
          }}/>

    return (
      <div>
        {mismatchPasswords}
          <CardTitle className='cardTitle'  title='Registration'/>
          <TextField
            onBlur={this.setFirstName}
            type='text'
            hintText='John'
            fullWidth={true}
            floatingLabelText='First Name' />
          <TextField
            onBlur={this.setLastName}
            type='text'
            hintText='Doe'
            fullWidth={true}
            floatingLabelText='Last Name' />
          <TextField
            onBlur={this.setEmail}
            type='email'
            hintText='john.doe@example.com'
            fullWidth={true}
            errorText={incorrectEmail}
            floatingLabelText='Email' />
          <TextField
            onChange={this.setPassword}
            type='password'
            fullWidth={true}
            floatingLabelText='Password' />
          <TextField
            onChange={this.setPasswordConfirm}
            type='password'
            errorText={this.state.passwordConfirmMessage}
            errorStyle={{color: this.state.passwordConfirmColor}}
            fullWidth={true}
            floatingLabelText='Confirm Password' />
          {disabledRegister}
          <hr/>
          <RaisedButton primary={true}  onClick={this.handleFbClick} className='fb_button' style={{margin: '20px auto', float: 'left'}} fullWidth={true}>
            <i style={{color: '#3A5795', margin: '4px 47%', float: 'left'}} className='fa fa-facebook fa-2x fa-inverse'></i>
          </RaisedButton>
          
          <hr style={{margin: '10px 0'}} />

          <RaisedButton className='raisedButton' primary={true} onClick={this.props.toggleForm} style={{margin: '30px auto'}} label="Already A User?"  fullWidth={true}>
          </RaisedButton>
      </div>

    )
  }
})
