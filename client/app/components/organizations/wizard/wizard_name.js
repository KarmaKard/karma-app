import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import mui from 'material-ui'
import {AppBar, IconButton, CardTitle, FlatButton, RaisedButton, TextField} from 'material-ui'

var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({

  getInitialState () {
    return {
      nameErrorMessage: null,
      buttonDisabled: true
    }
  },

  nextClicked (e) {
    var name = this.state.name
    if(name) {
      this.props.setName(name.charAt(0).toUpperCase() + name.slice(1))
    }
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },

  setName (e) {
    var sameNameOrganizations = this.props.organizations.filter(organization => 
      organization.name.toLowerCase().replace(/ /g,'') === e.target.value.toLowerCase().replace(/ /g,''))

    if (sameNameOrganizations.length > 0) {
      this.setState({nameErrorMessage: 'Must have unique name', buttonDisabled: true})
      return
    }
    this.setState({
      buttonDisabled: false,
      nameErrorMessage: null,
      name: e.target.value
    })
  },

  render() {
  injectTapEventPlugin()
    var orgType = this.props.orgType
    var capitalizedType = orgType === 'business' ? 'Business' : 'Fundraiser'
    return (
      <div>
        <div className='content_box-header'>{capitalizedType} Name</div>
        <form>
          <TextField
            fullWidth={true}
            onChange={this.setName}
            hintText='ABC Co.'
            floatingLabelText={capitalizedType + ' Name'} 
            errorText={this.state.nameErrorMessage}/>
          <RaisedButton className='raisedButton' primary={true} 
            onClick={this.nextClicked} 
            label='Next' 
            disabled={this.state.buttonDisabled} 
            style={{margin: '10px auto'}} 
            fullWidth={true} />

        </form>
      </div>
    )
  }
})
