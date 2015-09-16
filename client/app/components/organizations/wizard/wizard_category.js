import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import mui from 'material-ui'
import {AppBar, SelectField, IconButton, CardTitle, FlatButton, RaisedButton, TextField} from 'material-ui'

var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState () {
    return {
      category: null
    }
  },

  changeCategory (e) {
    this.setState({category: e.target.value})
  },

  nextClicked(e) {
    e.preventDefault()
    var category = this.state.category
    this.props.setCategory(category)
  },

  render () {

    var categories = [
      {value: 'Dining', text: 'Dining'},
      {value: 'Entertainment', text: 'Entertainment'},
      {value: 'Health & Fitness', text: 'Health & Fitness'},
      {value: 'Home & Garden', text: 'Home & Garden'},
      {value: 'Professional', text: 'Professional'},
      {value: 'Services', text: 'Services'},
      {value: 'Shopping', text: 'Shopping'}
    ]

    var stateCategory = this.state.category ? this.state.category : null
    return (
      <div>
        <CardTitle className="cardTitle">Business Category</CardTitle>
        <SelectField
          hintText="Business Category"
          floatingLabelText="Business Category"
          value={stateCategory}
          onChange={this.changeCategory}
          valueMember="value"
          displayMember="text"
          fullWidth={true}
          menuItems={categories}/>
        <RaisedButton
          primary={true} 
          fullWidth={true} 
          onClick={this.nextClicked} 
          className='raisedButton' 
          label="Next" 
          style={{
            margin: '15px 0 0 0'
          }}/>
      </div>
    )
  }
})
