import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { flux } from '../../../main'
import JoinProfile from '../join_profile'

export default React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  render() {
  injectTapEventPlugin()
    var organizations = this.props.organizations
     var organizationName = this.context.router.getCurrentParams().fundraiserName
     var organization = organizations.filter(organization => organization.name.toLowerCase().replace(/ /g,'') === organizationName)[0]
     var fundraiserMemberName = this.context.router.getCurrentParams().fundraiserMemberName
     if (fundraiserMemberName && this.props.fundraiserMembers.length > 0) {
        var fundraiserMembers = this.props.fundraiserMembers
        var fundraiserMember = fundraiserMembers.filter(fundraiserMember => fundraiserMember.name.toLowerCase().replace(/ /g,'') === fundraiserMemberName)[0]
     }
     

    var deals = this.props.deals
    if (organizations.length === 0 || !organization || deals.length === 0) {
      return <div>We are picking up some data for a second.</div>
    }
    return <JoinProfile organizations={organizations} deals={deals} organization={organization} affiliateFundraiserName={organizationName} affiliateName={fundraiserMemberName}/>
  }
})
