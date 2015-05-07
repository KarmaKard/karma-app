
export default {
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
  }
}
