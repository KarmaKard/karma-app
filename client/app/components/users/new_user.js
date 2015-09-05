import React from 'react'
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
      <div>
        <Card
          className='main_card'>
        <CardTitle title='Get Good Karma!'/>
          <CardText>Give good, Get good. In order to have full access to KarmaKard, we ask that you give to a local fundraising organization. A $30 dollar donation will give you instant access to thousands of dollars in exclusive deals.</CardText>
          <Link to='list_deals'><RaisedButton fullWidth={true} style={{margin:'10px 0 20px 0'}} label='Check out the list of deals' /></Link>
          <Link to='fundraisers'><RaisedButton fullWidth={true} label='Donate to a local fundraiser' /></Link>
        </Card>
        <Card
          className='main_card'>
        <CardTitle title='Have an Organization?'/>
        <CardText>If you have a business or a fundraiser, you can signup and apply for your organization to be a part of Karmakard!</CardText>
        <Link to='create_organization'><RaisedButton fullWidth={true} style={{margin:'10px 0 0 0'}} label='Register your organization' /></Link>
        </Card>
      </div>
    )
  }
})
