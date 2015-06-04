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
  cors: {
    whitelist: [
      'http://localhost:4200'
    ]
  }
}
