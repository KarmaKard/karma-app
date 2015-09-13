import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { flux } from '../../main'
import mui from 'material-ui'
import {AppCanvas, AppBar, Tabs, Tab, FlatButton, FontIcon, UserSideBar, CardTitle, Card, CardMedia, CardHeader, TextField, List, ListItem, RaisedButton, CardText, FloatingActionButton} from 'material-ui'
var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({
  PropTypes: {
    locations: React.PropTypes.array.isRequired
  },

  getInitialState(){
    return {
      locations: [],
      newStreet: '',
      newZip: '',
      zipErrorMessage: null,
      zipErrorColor: 'red',
      editDisabled: false,
      buttonDisabled: true
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

  componentWillMount() {
    if(this.props.organization.locations.length > 0){
      this.setState({locations: this.props.organization.locations, editDisabled: this.props.editDisabled})
    }
  },

  updateNewStreet(e){
    if (this.state.newZip && this.state.newZip.length === 5 && e.target.value) {
      this.setState({
        newStreet: e.target.value,
        buttonDisabled: false
      })
      return
    }
    this.setState({
      newStreet: e.target.value,
      buttonDisabled: true
    })
  },

  updateNewZip (e) {
    if (isNaN(e.target.value) || e.target.value.length > 5) {
      e.target.value = e.target.value.substring(0, e.target.value.length - 1)
      this.setState({zipErrorMessage: 'Must be 5 Digits', zipErrorColor: 'red'})
      return
    } else if (e.target.value.length === 5) {
      if (this.state.newStreet) {
        this.setState({newZip: e.target.value, zipErrorMessage: 'Perfect!', zipErrorColor: 'green', buttonDisabled: false})
      }
      else {
        this.setState({newZip: e.target.value, zipErrorMessage: 'Perfect!', zipErrorColor: 'green', buttonDisabled: true})
      }
      
    } else {
      this.setState({newZip: e.target.value, buttonDisabled: true})
    }
  },

  checkNewZip(e){
    if(this.validateZip(e.target.value)){
      this.setState({
        newZip: e.target.value
      })
      return
    }
    e.target.value = e.target.value.substring(0, e.target.value.length - 1)
    this.setState({zipErrorMessage: 'Must be 5 Digits'})
  },

  handleAddNew(){
    if( !this.validateZip(this.state.newZip)){
      React.findDOMNode(this.refs.zip).style.border="3px solid rgb(242, 29, 29)"
      return
    }

    var newLocation = {
      street: this.state.newStreet,
      zip: this.state.newZip,
      organizationId: this.props.organization.id
    }

    this.setState({
      newStreet: '',
      newZip: ''
    })

    flux.actions.organizations.saveLocation(newLocation)
  },

  validateZip(zipString){
    return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipString)
  },

  render() {
    var locationArray = this.props.organization.locations

    var listItems = locationArray.map((location, index) => {
      return (
        <ListItem primaryText={location.formattedAddress}/>
      )
    })

    var buttonDisabler = this.props.editDisabled 
      ? this.props.editDisabled
      : this.state.buttonDisabled

    var mapString = 'https://maps.googleapis.com/maps/api/staticmap?size=600x300&maptype=roadmap'
    for (var i = 0; i < locationArray.length; i++) {
      var coords = '&markers=' + locationArray[i].latitude + ',' + locationArray[i].longitude 
      mapString += coords
    }
    mapString += '&key=AIzaSyBm4B7SMPjld2uuinozMm2O-WwkKS7wT_M'
    var mapImage = locationArray.length > 0 ? <img src={mapString} /> : null

    return (
      <div>
      {mapImage}
      <CardText>*One location Required</CardText>
        <div>
          <List>
            {listItems}
          </List>
        </div>
        <div>
        <TextField
          hintText="123 Easy St."
          fullWidth={true}
          floatingLabelText="Full Street Address"
          value={this.state.newStreet} 
          onChange={this.updateNewStreet} 
          disabled={this.props.editDisabled} />

        <TextField
          hintText="84604"
          fullWidth={true}
          floatingLabelText="Zip Code"
          value={this.state.newZip} 
          onBlur={this.checkNewZip}
          onChange={this.updateNewZip} 
          disabled={this.props.editDisabled} 
          errorText={this.state.zipErrorMessage}
          errorStyle={{color:this.state.zipErrorColor}}/>

          <RaisedButton 
            label="Add Location" 
            fullWidth={true}
            onClick={this.handleAddNew} 
            disabled={buttonDisabler}
            style={{
                  margin: '15px 0'
            }}/>
        </div>
      </div>
    )
  }
})