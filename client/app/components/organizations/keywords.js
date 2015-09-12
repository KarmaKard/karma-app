import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { flux } from '../../main'
import mui from 'material-ui'

import {AppBar, FlatButton, Card, CardText, CardHeader, SelectField, CardTitle, TextField, RaisedButton, Slider} from 'material-ui'

var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({
  getInitialState(){
    return {
      newKeyword: '',
      keywords: [],
      disableButton: true,
      keyword1: null,
      keyword2: null,
      keyword3: null,
      keyword4: null,
      keyword5: null
    }
  },

  componentWillMount () {
    if(this.props.organization.keywords.length > 0){
      this.setState({
        keyword1: this.props.organization.keywords[0],
        keyword2: this.props.organization.keywords[1],
        keyword3: this.props.organization.keywords[2],
        keyword4: this.props.organization.keywords[3],
        keyword5: this.props.organization.keywords[4]
      })
    }

  },

  changeKeyword1(e){
    this.setState({keyword1: e.target.value, disableButton: false})
  },

  changeKeyword2(e){
    this.setState({keyword2: e.target.value, disableButton: false})
  },

  changeKeyword3(e){
    this.setState({keyword3: e.target.value, disableButton: false})
  },

  changeKeyword4(e){
    this.setState({keyword4: e.target.value, disableButton: false})
  },

  changeKeyword5(e){
    this.setState({keyword5: e.target.value, disableButton: false})
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },

  saveKeywords(){
    var organization = this.props.organization
    var keyword1 = this.state.keyword1
    var keyword2 = this.state.keyword2
    var keyword3 = this.state.keyword3
    var keyword4 = this.state.keyword4
    var keyword5 = this.state.keyword5
    var keywordArray = [keyword1, keyword2, keyword3, keyword4, keyword5]
    organization.keywords = keywordArray
    this.props.updateOrganization(organization)
    this.setState({disableButton: true})
  },

  render() {
    var keyword1, keyword2, keyword3, keyword4, keyword5

      keyword1 = this.state.keyword1 ? this.state.keyword1 : this.props.organization.keywords[0]
      keyword2 = this.state.keyword2 ? this.state.keyword2 : this.props.organization.keywords[1]
      keyword3 = this.state.keyword3 ? this.state.keyword3 : this.props.organization.keywords[2]
      keyword4 = this.state.keyword4 ? this.state.keyword4 : this.props.organization.keywords[3]
      keyword5 = this.state.keyword5 ? this.state.keyword5 : this.props.organization.keywords[4]
    
    return (
      <div>
        <CardText>Keywords are not seen by customers but are used to determine relevant search results. *One keyword Required</CardText>
         <TextField
          hintText="Fast Food, Chinese, Date Night, Skating "
          fullWidth={true}
          floatingLabelText="Keyword 1"
          defaultValue={keyword1} 
          onChange={this.changeKeyword1}
          disabled={this.props.editDisabled} />

         <TextField
          hintText="Fast Food, Chinese, Date Night, Skating "
          fullWidth={true}
          floatingLabelText="Keyword 2"
          defaultValue={keyword2} 
          onChange={this.changeKeyword2}
          disabled={this.props.editDisabled} />

         <TextField
          hintText="Fast Food, Chinese, Date Night, Skating "
          fullWidth={true}
          floatingLabelText="Keyword 3"
          defaultValue={keyword3} 
          onChange={this.changeKeyword3}
          disabled={this.props.editDisabled} />

         <TextField
          hintText="Fast Food, Chinese, Date Night, Skating "
          fullWidth={true}
          floatingLabelText="Keyword 4"
          defaultValue={keyword4} 
          onChange={this.changeKeyword4}
          disabled={this.props.editDisabled} />

         <TextField
          hintText="Fast Food, Chinese, Date Night, Skating "
          fullWidth={true}
          floatingLabelText="Keyword 5"
          defaultValue={keyword5} 
          onChange={this.changeKeyword5}
          disabled={this.props.editDisabled} />

          <RaisedButton 
            disabled={this.state.disableButton}
            fullWidth={true} 
            onClick={this.saveKeywords} 
            label="Save Keywords" 
            style={{
              margin: '15px 0 0 0'
            }}/>

      </div>
    )
  }
})
