import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Link } from 'react-router'
import mui from 'material-ui'
import {AppBar, AppCanvas, IconButton, Card, CardTitle, List, ListItem, Avatar} from 'material-ui'

var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({

  propTypes: {
    activeFundraisers: React.PropTypes.array.isRequired
  },

  componentWillMount() {
    this.props.showBackLink(true)
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


  render() {
  injectTapEventPlugin()
    var activeFundraisers = this.props.activeFundraisers
    if (activeFundraisers.length === 0) {
      return (
        <div>
          <div className='page_header'>
            <div className='page_header_title'>KarmaKard</div>
          </div>
          <div className='content_box'>
            <div className='content_box-header'>
              Wow! We Dont Have Any Fundraisers
            </div>
            <p>Have a Organization that you would like to fundraise for?</p>
            <p><Link to='create_organization'>Sign Up Here!</Link></p>
          </div>
        </div>
      )
    }
    var fundraiserLinks = activeFundraisers.map((fundraiser, index) => {
      var logo = fundraiser.logoURL ? <Avatar style={{height: '40px', width: '40px', padding: 0}} src={fundraiser.logoURL} /> : <i className="material-icons">photo</i>
      return (
        <Link key={index} to='fundraiser_profile' params={{organizationId: fundraiser.id}}>
          <ListItem
            primaryText={fundraiser.name}
            initiallyOpen={true}
            leftIcon={logo}/>
        </Link>
      )
    })

    return (
        <Card className='main_card'>
          <CardTitle className='cardTitle' 
            title="Select a fundraiser" />
          <List>
            {fundraiserLinks}
          </List>
        </Card>
    )
  }
})
