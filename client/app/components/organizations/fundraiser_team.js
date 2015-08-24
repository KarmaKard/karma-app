import React from 'react'
import { flux } from '../../main'

export default React.createClass({

  propTypes: {
    organization: React.PropTypes.object.isRequired,
    editDisabled: React.PropTypes.bool,
    fundraiserMembers: React.PropTypes.array.isRequired
  },

  getInitialState () {
    return {
      newName: '',
      newEmail: '',
      organization: {},
      disableInput: false,
      paidMembers: []
    }
  },

  componentWillMount () {
    if (this.props.organization) {
      this.setState({organization: this.props.organization})
    }
  },

  updateName (e) {
    if (React.findDOMNode(this.refs.name).value.length > 10) {
      React.findDOMNode(this.refs.name).value = React.findDOMNode(this.refs.name).value.substring(0, 10)
    }
    this.setState({
      newName: React.findDOMNode(this.refs.name).value
    })
    React.findDOMNode(this.refs.saveButton).style.border = '3px solid rgb(242, 29, 29)'
  },

  updateNewEmail (e) {
    this.setState({
      newEmail: e.target.value
    })
    if (this.validateEmail(e.target.value)) {
      React.findDOMNode(this.refs.email).style.border = ''
    }
    React.findDOMNode(this.refs.saveButton).style.border = '3px solid rgb(242, 29, 29)'
  },

  handleAddNew () {

    if (!this.validateEmail(this.state.newEmail)) {
      React.findDOMNode(this.refs.email).style.border = '3px solid rgb(242, 29, 29)'
      return
    }

    var newMember = {
      name: this.state.newName,
      email: this.state.newEmail
    }

    var organization = this.state.organization

    flux.actions.organizations.createFundraiserMember(organization, newMember)

    this.setState({
      newName: '',
      newEmail: '',
      organization
    })
    React.findDOMNode(this.refs.add_form).style.display = 'none'
    React.findDOMNode(this.refs.add_button).style.display = 'inherit'
    this.setState({
      disableInput: false
    })
    React.findDOMNode(this.refs.saveButton).style.border = '3px solid rgb(75, 187, 44)'
  },

  validateEmail (emailString) {
    return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/.test(emailString)
  },

  addClicked () {
    React.findDOMNode(this.refs.add_form).style.display = 'inherit'
    React.findDOMNode(this.refs.add_button).style.display = 'none'
    this.setState({
      disableInput: true
    })
  },

  payInputChanged (e) {
    React.findDOMNode(this.refs.add_form).style.display = 'none'
    React.findDOMNode(this.refs.add_button).style.display = 'none'
    React.findDOMNode(this.refs.save_all_button).style.display = 'inherit'

    if (parseInt(e.target.value, 10) > parseInt(e.target.parentNode.parentNode.childNodes[3].innerHTML, 10)) {
      e.target.value = e.target.value.substring(0, e.target.value.length - 1)
    }
  },

  setPayOnMemberObject (e) {
    var fundraiserMember = this.props.fundraiserMembers.find(fundraiserMember => fundraiserMember.id === e.target.id)

    var newOweAmount = (fundraiserMember.oweAmount - (parseInt(e.target.value, 10) * 100))

    var paidObject = {fundraiserMemberId: e.target.id, newOweAmount: newOweAmount}
    var paidMembers = this.state.paidMembers
    var objectInPaidMembers
    for (var i = 0; i < paidMembers.length; i++) {
      if (paidMembers[i].id === e.target.id) {
        paidMembers[i] = paidObject
        objectInPaidMembers++
      }
    }
    if (!objectInPaidMembers) {
      paidMembers.push(paidObject)
    }
    this.setState({paidMembers})
  },

  saveAll () {
    flux.actions.organizations.updateOwedAmounts(this.state.paidMembers)
    var inputFields = document.getElementsByClassName('team_member_pay_input')
    for (var i = 0; i < inputFields.length; i++) {
      inputFields[i].value = null
    }

    React.findDOMNode(this.refs.add_form).style.display = 'none'
    React.findDOMNode(this.refs.add_button).style.display = 'inherit'
    React.findDOMNode(this.refs.save_all_button).style.display = 'none'
  },

  SaveClicked () {

  },

  cancelClicked () {
    React.findDOMNode(this.refs.add_form).style.display = 'none'
    React.findDOMNode(this.refs.add_button).style.display = 'inherit'
    this.setState({
      disableInput: false
    })
  },

  render () {
    var fundraiserMembers = this.props.fundraiserMembers.filter(fundraiserMember => fundraiserMember.organizationId === this.props.organization.id)
    var listItems = fundraiserMembers.map((member, index) => {
      var disableInput = false
      if (member.oweAmount === 0 || this.state.disableInput) {
        disableInput = true
      }

      var statusIcon = member.status === 'inactive'
      ? <i className='fa fa-clock-o'></i>
      : <i className='fa fa-check'></i>

      return (
        <tr key={index}>
          <td className='team_member_name'>{member.name}</td>
          <td className='team_member_status'>{statusIcon}</td>
          <td className='team_member_raised'>${member.raisedAmount / 100}</td>
          <td className='team_member_owe'>${member.oweAmount / 100}</td>
          <td><input type='number' id={member.id} onBlur={this.setPayOnMemberObject} onChange={this.payInputChanged} disabled={disableInput} className='team_member_pay_input'/></td>
        </tr>
      )
    })
    return (
      <div>
        <div className='content_box-header'>Members</div>
        <div>
          <table className='teamTable'>
            <tr>
              <th className='team_table_header team_member_name'>Name</th>
              <th className='team_table_header team_member_status'>Status</th>
              <th className='team_table_header team_member_raised'>Raised</th>
              <th className='team_table_header team_member_owe'>Owe</th>
              <th>Payment</th>
            </tr>
            {listItems}
          </table>
        </div>
        <button
          ref='add_button'
          className='karma_button'
          onClick={this.addClicked}>
            Add
        </button>
        <button
          ref='save_all_button'
          className='karma_button save_members'
          onClick={this.saveAll}>
            Save All
        </button>
        <div className='add_member' ref='add_form'>
          <input
            type='text'
            className='karma_input name_address_input'
            placeholder='Name'
            ref='name'
            maxLength='10'
            value={this.state.newName}
            onChange={this.updateName}/>
          <input
            type='text'
            ref='email'
            className='email_input karma_input '
            placeholder='Email'
            value={this.state.newEmail}
            onChange={this.updateNewEmail} />
          <button
            ref='saveButton'
            className='karma_button'
            onClick={this.handleAddNew}>
              Save
          </button>
          <button
            ref='cancelButton'
            className='karma_button'
            onClick={this.cancelClicked}>
              Cancel
          </button>
        </div>
      </div>
    )
  }
})
