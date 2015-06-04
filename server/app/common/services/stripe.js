var stripe = require('stripe')('sk_test_Y1s7AIm1iosOXbf9SDrhkZPh');

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