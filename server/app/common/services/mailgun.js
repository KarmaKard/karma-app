import config from 'config'

export function send (data) {
  var api_key = config.mailgun.key
  var domain = 'sandboxd40e112148934037b3388ea567007e40.mailgun.org'
  var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain})

  return new Promise((resolve, reject) => {
    mailgun.messages().send(data, (error, body) => {
      if (error) {
        return reject(error)
      }
      resolve(body)
    })
  })
}

export function sendMimeMessage (dataToSend) {
  var api_key = config.mailgun.key
  var domain = 'sandboxd40e112148934037b3388ea567007e40.mailgun.org'
  var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain})

  return new Promise((resolve, reject) => {
    mailgun.messages().sendMime(dataToSend, function (sendError, body) {
      if (sendError) {
          console.log(sendError);
          return;
      } 
    })
  })
}

