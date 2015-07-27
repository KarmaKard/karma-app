import React from 'react'
import { flux } from '../../../main'
import { Link } from 'react-router'
import UserSideBar from '../../users/user_sidebar'
import { formatDateString } from '../../../utils/transforms'

export default React.createClass({

  propTypes: {
    payments: React.PropTypes.array,
    user: React.PropTypes.object,
    organizations: React.PropTypes.array
  },

  defaultProps: {
    organizations: []
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  logOut () {
    var { router } = this.context
    flux.actions.users.logout(router)
  },

  render () {
    var payments = this.props.payments
    var user = this.props.user
    var organizations = this.props.organizations
    var now = Date.now()
    var paymentDate, expirationDate, oneCardExistsID
    var dealCardLinks = payments.map(function (payment) {
      paymentDate = new Date(payment.createdAt)
      expirationDate = new Date(payment.createdAt)
      expirationDate = expirationDate.setFullYear(expirationDate.getFullYear() + 1)
      expirationDate = new Date(expirationDate)
      if (now < expirationDate && now > paymentDate) {
        oneCardExistsID = payment.id
        return (
          <li>
            <Link to='deal_card' params={{paymentId: payment.id}}>
              <div className='dealCardBox'>
                {formatDateString(paymentDate) + ' - ' + formatDateString(expirationDate)}
              </div>
            </Link>
          </li>
        )
      }
      return null
    })

    if (dealCardLinks.length === 0) {
      dealCardLinks = (
        <li>
          <Link to='list_deals'>
            <div className='dealCardBox'>
              Add a Card!
            </div>
          </Link>
        </li>
      )
    } else if (dealCardLinks.length === 1) {
      var router = this.context.router
      router.transitionTo('deal_card', {paymentId: oneCardExistsID})
    }

    var addNewLink = null

    if (!user.roles.manager && !user.roles.superadmin) {
      addNewLink = (
        <div>
          <hr />
          <Link to='new_organization' className='create_organization-link'>
            Business? Fundraiser?
            <span className='create_organization-link_span'>Offer deals with us!</span>
          </Link>
        </div>
      )
    }

    return (
      <div>
         <div className='page_header'>
            <div className='page_header_title'>{user.firstName}</div>
            <div className='page_header_link' onClick={this.logOut}>
              Log Out
            </div>
          </div>
          <UserSideBar organizations={organizations} user={user} />
          <div className='content_box'>
            <div className='content_box-header'>
              Your Deal Cards
            </div>
            <ul className='deal_card-list'>
              {dealCardLinks}
            </ul>
            {addNewLink}
          </div>
        </div>
    )
  }
})
