import bcrypt from 'bcryptjs'

export function hash (password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return reject(err)
      resolve(hash)
    })
  })
}

export function compare (password, pHash) {
  console.log(password, pHash, 'Comparing these')
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, pHash, (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}
