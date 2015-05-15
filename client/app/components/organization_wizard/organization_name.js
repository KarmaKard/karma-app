import React from 'react'
import { flux } from '../../main'

export default React.createClass({

  nextClicked(e) {
    e.preventDefault()
    var name  =  this.refs.name.getDOMNode().value
    this.props.setName(name)
    this.props.nextStep()
  },

  render() {
    return (
      <div>
        <div className="content_box-header">{this.props.organizationInformation.type} Name</div>
        <form>
          <input type="text" ref="name" className="karma_input" placeholder="Name" />
          <input type="submit" ref="button" onClick={this.nextClicked} className="karma_button" value="Next" />
        </form>
      </div>
    )
  }
})
