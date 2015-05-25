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
    this.props.organization.keywords = keywordArray
    this.props.updateOrganization(this.props.organization)
  },

  render() {
    var keyword1, keyword2, keyword3, keyword4, keyword5
    if(this.props.organization.keywords !== undefined){
      keyword1 = this.props.organization.keywords[0]
      keyword2 = this.props.organization.keywords[1]
      keyword3 = this.props.organization.keywords[2]
      keyword4 = this.props.organization.keywords[3]
      keyword5 = this.props.organization.keywords[4]
    }
    
    return (
      <div>
        <div className="content_box-header">Keywords</div>
          <input
            type="text"
            className="keyword-list__input karma_input"
            ref="keywordInput1"
            defaultValue={keyword1}
            placeholder="Keyword 1"/>

          <input
            type="text"
            className="keyword-list__input karma_input"
            ref="keywordInput2"
            defaultValue={keyword2}
            placeholder="Keyword 2"/>

          <input
            type="text"
            className="keyword-list__input karma_input"
            ref="keywordInput3"
            defaultValue={keyword3}
            placeholder="Keyword 3"/>

          <input
            type="text"
            className="keyword-list__input karma_input"
            ref="keywordInput4"
            defaultValue={keyword4}
            placeholder="Keyword 4"/>

          <input
            type="text"
            className="keyword-list__input karma_input"
            ref="keywordInput5"
            defaultValue={keyword5}
            placeholder="Keyword 5"/>

            <button className="karma_button" onClick={this.saveKeywords}>Save</button>
      
      </div>
    )
  }
})
