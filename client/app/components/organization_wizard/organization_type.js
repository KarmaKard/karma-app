import React from 'react'
import { flux } from '../../main'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  businessTypeClicked(e) {
    e.preventDefault()
    var type = React.findDOMNode(this.refs.business).value
    this.props.setType(type)
  },
  fundraiserTypeClicked(e) {
    e.preventDefault()
    var type = React.findDOMNode(this.refs.fundraiser).value
    this.props.setType(type)
  },

  render() {
    console.log(this.props)
    return (
      <div>
        <div className="content_box-header">Organization Type?</div>
        <form>
          <input type="submit" ref="business" onClick={this.businessTypeClicked} className="Organization_is_business-button" value="Business" />
          <input type="submit" ref="fundraiser" onClick={this.fundraiserTypeClicked} className="Organization_is_fundraiser-button" value="Fundraiser" />
        </form>
      </div>
    )
  }
})
