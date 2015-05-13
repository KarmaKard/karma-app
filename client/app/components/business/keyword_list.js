import React from 'react'

export default React.createClass({
  getInitialState(){
    return {
      newKeyword: '',
      keywords: []
    }
  },

  updateNewKeyword(e){
    this.setState({
      newKeyword: e.target.value
    })
  },

  handleAddNew(){
    this.setState({
      newKeyword: '',
      keywords: this.state.keywords.concat(this.state.newKeyword)
    })
    React.findDOMNode(this.refs.keywordInput).focus()
  },
  getKeywords() {
    return this.state.keywords
  },

  render(){
    var listItems = this.state.keywords.map((keyword, index) => {
      return <li className="keyword_list-item" key={index}>{keyword}</li>
    })

    return (
      <div>
        <h3>Keywords</h3>
        <div>
          <ul>
            {listItems}
          </ul>
        </div>
        <div>
          <input
            type="text"
            className="keyword-list__input karma_input"
            ref="keywordInput"
            placeholder="Type Keyword"
            value={this.state.newKeyword}
            onChange={this.updateNewKeyword}
          />
          <button className="keyword-list__add-button" onClick={this.handleAddNew}>Add Keyword</button>
        </div>
      </div>
    )
  }
})
