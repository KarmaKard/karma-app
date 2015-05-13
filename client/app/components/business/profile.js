import React from 'react'
import { flux } from '../../main'
import KeyWordList from './keyword_list'

export default React.createClass({
  propTypes: {
    business: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      business: {
        keywords: []
      }
    }
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  nextClicked(e) {
    var { router } = this.context
    var name = React.findDOMNode(this.refs.name).value
    var description = React.findDOMNode(this.refs.description).value
    var keywords = this.refs.keywords.getKeywords()
    var business = { name, description, keywords }
    flux.actions.business.create(router, business)
  },

  render() {
    var { name, description, keywords } = this.props.business

    return (
      <div className="pagewrap">
        <button className="navbuttons__button" onClick={this.nextClicked}>
          Next
        </button>
        <h2>Business Profile Builder</h2>
        <div className="general-info">
          <img className="general-info__logo" src="" alt="logo" />
          <div className="general-info__text">
            <input
              type="text"
              ref="name"
              className="general-info__text__org-name karma_input"
              placeholder="Business Name"
              defaultValue={name}
            />
            <textarea
              type="text"
              ref="description"
              className="general-info__text__org-desc karma_input"
              placeholder="Business Description"
              defaultValue={description}
            />
          </div>
        </div>
        <KeyWordList ref="keywords" keywords={keywords} />
      </div>
    )
  }
})
