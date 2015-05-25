import React from 'react'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  didChooseType(e) {
    var type = e.target.value
    this.props.setType(type.toLowerCase())
  },

  render() {
    return (
      <div>
        <div className="content_box-header">Organization Type?</div>
        <input type="submit" onClick={this.didChooseType} className="Organization_type_button" value="Business" />
        <input type="submit" onClick={this.didChooseType} className="Organization_type_button" value="Fundraiser" />
      </div>
    )
  }
})
