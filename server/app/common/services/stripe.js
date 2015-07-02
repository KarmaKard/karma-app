import config from 'config'
import stripePackage from 'stripe'

var stripe = stripePackage(config.stripe.token)

export async function createAccount (){
  try {
    return stripe.accounts.create({
        country: "US",
        managed: true
      })
  } catch (e) {
    console.warn("stripe api call: Create did not work")
  }
}

export async function chargeCustomer (user, stripeToken){
  try {
    var customer = {}
    if(!user.stripeCustomerId){
      customer = await stripe.customers.create({
        source: stripeToken,
        description: "Purchase of KarmaKard in support of fundraiser"
      })
    }
    else{customer.id = user.stripeCustomerId}
    var charge = await stripe.charges.create({
      amount: 3000, // amount in cents, again
      currency: "usd",
      customer: customer.id,
      description: "Example charge"
    })
    return charge

  } catch (e) {
    console.warn("stripe api call: Charge did not work")
  }
}

