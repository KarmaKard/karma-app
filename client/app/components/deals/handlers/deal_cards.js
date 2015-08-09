import React from 'react'
import { flux } from '../../../main'
import { Link } from 'react-router'
import { formatDateString } from '../../../utils/transforms'

export default React.createClass({
  propTypes: {
    payments: React.PropTypes.array.isRequired,
    user: React.PropTypes.object.isRequired,
    organizations: React.PropTypes.array.isRequired
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
    return (
      <div>
        <div className='content_box-header'>
          Your Deal Cards
        </div>
        <ul className='deal_card-list'>
          {dealCardLinks}
        </ul>
      </div>
    )
  }
})