import React from 'react'

export default React.createClass({
  render() {
    return (
        <div id="login" >
          <form>
            <input type="text" id="email" value="email" />
            <input type="password" id="password" value="password" />
            <input type="submit" id="submitbutton" value="Submit"/>
          </form>
       </div>
    )
  }
})