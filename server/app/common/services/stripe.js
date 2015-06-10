import config from 'config'
import stripePackage from 'stripe'

var stripe = stripePackage(config.stripe.token)

export async function createAccount (request, organization){
  try {
    return stripe.accounts.create({
        country: "US",
        managed: true,
        legal_entity: {
          first_name: organization.bankInfo.firstName,
          last_name: organization.bankInfo.lastName,
          dob:{
            day: organization.bankInfo.dobDate,
            month: organization.bankInfo.dobMonth,
            year: organization.bankInfo.dobYear,
          },
          type:'non_profit'
        },
        bank_account:{
          country: 'US',
          currency: 'usd',
          routing_number:organization.bankInfo.routingNumber,
          account_number:organization.bankInfo.accountNumber
        },
        tos_acceptance:{
          ip: request.headers['x-forwarded-for'] || request.connection.remoteAddress,
          date: Math.floor(Date.now() / 1000)
        }
      })
  } catch (e) {
    console.warn("stripe api call: Create did not work")
  }
}

