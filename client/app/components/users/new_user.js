import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { flux } from '../../main'
import { Link } from 'react-router'
import mui from 'material-ui'
import {AppBar, FlatButton, Card, CardTitle, RaisedButton, CardText} from 'material-ui'

var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },

  render() {

    return (
      <Card className='main_card'>
        <Card style={{margin:'10px 0 20px 0', padding:'10px 5px'}}>
        <CardTitle className='cardTitle'  title='Get Good Karma!'/>
          <CardText className='cardText'>Give good, Get good. In order to have full access to KarmaKard, we ask that you give to a local fundraising organization. A $30 dollar donation will give you instant access to thousands of dollars in exclusive deals.</CardText>
          <Link to='list_deals'><RaisedButton className='raisedButton' primary={true} fullWidth={true} style={{margin:'10px 0 20px 0'}} label='Check out the list of deals' /></Link>
          <Link to='fundraisers'><RaisedButton className='raisedButton' primary={true} fullWidth={true} label='Donate to a local fundraiser' /></Link>
        </Card>
        <Card style={{margin:'10px 0 20px 0', padding:'10px 5px'}}>
        <CardTitle className='cardTitle'  title='Have an Organization?'/>
        <CardText className='cardText' >If you have a business or a fundraiser, you can signup and apply for your organization to be a part of Karmakard!</CardText>
        <Link to='create_organization'><RaisedButton className='raisedButton' primary={true} fullWidth={true} style={{margin:'10px 0 0 0'}} label='Register your organization' /></Link>
        </Card>
        <Card style={{margin:'10px 0 20px 0', padding:'10px 5px'}}>
        <CardTitle className='cardTitle'  title='Already a User?'/>
        <CardText className='cardText' >Click here to go to the login page.</CardText>
        <Link to='login'><RaisedButton className='raisedButton' primary={true} fullWidth={true} style={{margin:'10px 0 0 0'}} label='Login' /></Link>
        </Card>
      </Card>
    )
  }
})
