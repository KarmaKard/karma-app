import React from 'react'
import mui from 'material-ui'
import {AppBar, IconButton, CardTitle, FlatButton, RaisedButton, TextField} from 'material-ui'

var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({

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
    this.setState({
      name: e.target.value
    })
  },

  render () {
    var orgType = this.props.orgType
    var capitalizedType = orgType === 'business' ? 'Business' : 'Fundraiser'
    return (
      <div>
        <div className='content_box-header'>{capitalizedType} Name</div>
        <form>
          <TextField
            fullWidth={true}
            onBlur={this.setName}
            hintText='ABC Co.'
            floatingLabelText={capitalizedType + ' Name'} />
          <RaisedButton onClick={this.nextClicked} style={{margin: '10px auto'}} fullWidth={true}>
            Next
          </RaisedButton>
        </form>
      </div>
    )
  }
})
