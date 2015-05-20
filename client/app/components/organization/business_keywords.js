import React from 'react'
import { flux } from '../../main'

export default React.createClass({
  getInitialState(){
    return {
      newKeyword: '',
      keywords: []
    }
  },

  saveKeywords(){
    var keyword1 = React.findDOMNode(this.refs.keywordInput1).value
    var keyword2 = React.findDOMNode(this.refs.keywordInput2).value
    var keyword3 = React.findDOMNode(this.refs.keywordInput3).value
    var keyword4 = React.findDOMNode(this.refs.keywordInput4).value
    var keyword5 = React.findDOMNode(this.refs.keywordInput5).value
    var keywordArray = [keyword1, keyword2, keyword3, keyword4, keyword5]
    this.props.currentOrganization.keywords = keywordArray
    this.props.updateOrganization(this.props.currentOrganization)
  },

  render() {

    
    return (
      <div>
        <div className="content_box-header">Keywords</div>
          <input
            type="text"
            className="keyword-list__input karma_input"
            ref="keywordInput1"
            defaultValue={this.props.currentOrganization.keywords[0]}
            placeholder="Keyword 1"/>

          <input
            type="text"
            className="keyword-list__input karma_input"
            ref="keywordInput2"
            defaultValue={this.props.currentOrganization.keywords[1]}
            placeholder="Keyword 2"/>

          <input
            type="text"
            className="keyword-list__input karma_input"
            ref="keywordInput3"
            defaultValue={this.props.currentOrganization.keywords[2]}
            placeholder="Keyword 3"/>

          <input
            type="text"
            className="keyword-list__input karma_input"
            ref="keywordInput4"
            defaultValue={this.props.currentOrganization.keywords[3]}
            placeholder="Keyword 4"/>

          <input
            type="text"
            className="keyword-list__input karma_input"
            ref="keywordInput5"
            defaultValue={this.props.currentOrganization.keywords[4]}
            placeholder="Keyword 5"/>

          <button className="karma_button" onClick={this.saveKeywords}>Save</button>
      
      </div>
    )
  }
})
