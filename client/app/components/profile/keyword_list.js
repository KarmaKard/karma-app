import React from 'react'

var AddKeyword = React.createClass({
  getInitialState: function(){
    return {
      newKeyword: ''
    }
  },
  updateNewKeyword: function(e){
    this.setState({
      newKeyword: e.target.value
    })
  },
  handleAddNew: function(){
    this.props.addNew(this.state.newKeyword)
    this.setState({
      newKeyword: ''
    })
    React.findDOMNode(this.refs.keyword_input).focus();
  },
  render: function(){
    return (
      <div>
        <input type="text" className="keyword-list__input" ref="keyword_input" placeholder="Type Keyword" value={this.state.newKeyword} onChange={this.updateNewKeyword} />
        <button className="keyword-list__add-button" onClick={this.handleAddNew}> Add Keyword</button>
      </div>
    )
  }
})

var ShowList = React.createClass({
  render: function(){
    var listItems = this.props.keywords.map(function(keyword_array){
      return <li> {keyword_array} </li>
      })
    return (
      <div>
        <ul>
          {listItems}
        </ul>
      </div>
    )
  }
})

export default React.createClass({
  getInitialState: function(){
    return {
      keyword_array: []
    }
  },
  addKeyword: function(keyword){
    this.state.keyword_array.push(keyword)
    this.setState({
      keyword_array: this.state.keyword_array
    })
  },
  render: function(){
    return (
      <div>
        <h3> Keywords </h3>
        <ShowList keywords={this.state.keyword_array} />
        <AddKeyword addNew={this.addKeyword} />
        
      </div>
    )
  }
})