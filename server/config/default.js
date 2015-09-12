require('dotenv').load()

module.exports = {
  database: {
    name: 'karmakard',
    params: {
      db: 'karmakard',
      pool: true,
      cursor: false
    }
  },
  log: {
    name: 'karma'
  },
  token: {
    secret: process.env.TOKEN_SECRET || 'asdo98hf2p23iupavgaw4r9ahwefo813bcp9'
  },
  stripe: {
    token: process.env.STRIPE_TOKEN
  },
  mailgun: {
    key: process.env.MAILGUN_KEY
  },
  googleGeocoder: {
    key: process.env.GOOGLE_GEOCODE
  },
  domain: {
    base_url: process.env.BASE_URL
  },
  cors: {
    whitelist: [
      'http://localhost:4200',
      'http://local.karmakard.org:4200'
    ]
  }
}
