import config from 'config'
import stripePackage from 'stripe'

var stripe = stripePackage(config.stripe.token)

export async function createAccount (){
  try {
    return stripe.accounts.create(
      {
        country: "US",
        managed: true
      }
    )
  } catch (e) {
    console.warn("stripe api call: Create did not work")
  }
}
