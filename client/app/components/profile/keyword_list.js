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
    this.addKeyword(this.state.newKeyword)
    this.setState({
      newKeyword: ''
    })
    React.findDOMNode(this.refs.keyword_input).focus();
  },
  addKeyword(keyword){
    this.setState({
      keywords: this.state.keywords.concat([keyword])
    })
  },
  render(){
    var listItems = this.state.keywords.map(function(keywords){
      return <li> {keywords} </li>
      })
    return (
      <div>
        <h3> Keywords </h3>
        <div>
          <ul>
            {listItems}
          </ul>
        </div>
        <div>
          <input type="text" className="keyword-list__input" ref="keyword_input" placeholder="Type Keyword" value={this.state.newKeyword} onChange={this.updateNewKeyword} />
          <button className="keyword-list__add-button" onClick={this.handleAddNew}> Add Keyword</button>
        </div>
        
      </div>
    )
  }
})