
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
    secret: process.env.TOKEN_SECRET
  },
  cors: {
    whitelist: [
      'http://localhost:4200',
      'http://local.karmakard.org:4200'
    ]
  }
}
