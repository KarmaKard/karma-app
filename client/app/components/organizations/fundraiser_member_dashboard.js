import React from 'react'
import { flux } from '../../main'
import { Link } from 'react-router'

export default React.createClass({
  propTypes: {
    organization: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
    fundraiserMember: React.PropTypes.object.isRequired,
    showBackLink: React.PropTypes.func.isRequired
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  logOut () {
    var { router } = this.context
    flux.actions.users.logout(router)
  },

  componentWillMount () {
    this.props.showBackLink(true)
  },

  copyToClipboard () {
    var text = location.protocol + '//' + location.hostname + 
      (location.port && ':' + location.port) + '/#' + '/join/' + this.props.fundraiserMember.id
    window.prompt('Copy to clipboard', text)
  },

  render () {
    var organization = this.props.organization
    var fundraiserMember = this.props.fundraiserMember
    if (!organization || !fundraiserMember) {
      return (
        <div>
          <h1>This is embarrassing, but...</h1>
          <p>We couldn&#39;t find this organization!</p>
        </div>
      )
    }
    return (
      <div>
        <div className='organization_information' >
          <div className='content_box-header'>{organization.name}</div>
        </div>
        <button className='karma_button' onClick={this.copyToClipboard}>Shareable Link</button>
        <Link to='inperson' params={{organizationId: organization.id}}><button className='karma_button'>In Person Sale</button></Link>
      </div>
    )
  }
})
