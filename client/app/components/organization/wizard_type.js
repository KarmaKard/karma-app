import React from 'react'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  didChooseType(e) {
    e.preventDefault()
    var type = e.target.value
    this.props.setType(type.toLowerCase())
  },

  render() {
    return (
      <div>
        <div className="content_box-header">Organization Type?</div>
        <input type="submit" ref="business" onClick={this.didChooseType} className="Organization_is_business-button" value="Business" />
        <input type="submit" ref="fundraiser" onClick={this.didChooseType} className="Organization_is_fundraiser-button" value="Fundraiser" />
      </div>
    )
  }
})
