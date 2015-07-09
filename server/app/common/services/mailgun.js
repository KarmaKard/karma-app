import config from 'config'
import mailgunPackage from 'mailgun-js'

export async function send (data){
  try {
    var api_key = config.mailgun.key
    var domain = 'sandboxd40e112148934037b3388ea567007e40.mailgun.org'
    var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain})
    
    console.log(api_key, domain, mailgun)
    return mailgun.messages().send(data, function (error, body) {
      console.log(body);
    })

  } catch (e) {
    console.warn("mailgun message didn't work")
  }
}

