import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import mui from 'material-ui'
import {AppBar, IconButton, CardTitle, FlatButton, RaisedButton, TextField} from 'material-ui'

var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  nextClicked(e) {
    e.preventDefault()
    var category = React.findDOMNode(this.refs.category).value
    this.props.setCategory(category)
  },

  render() {
    return (
      <div>
        <div className="content_box-header">Business Category</div>
        
        <select ref="category" className="karma_input">
          <option value="Dining">Dining</option>
          <option value="Entertainment"> Entertainment</option>
          <option value="Health & Fitness">Health & Fitness</option>
          <option value="Home & Garden">Home & Garden</option>
          <option value="Professional">Professional</option>
          <option value="Services">Services</option>
          <option value="Shopping">Shopping</option>
        </select>
        <form>
          <input type="submit" ref="button" onClick={this.nextClicked} className="karma_button" value="Next" />
        </form>
      </div>
    )
  }
})
