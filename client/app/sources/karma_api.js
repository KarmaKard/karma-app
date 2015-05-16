import request from 'superagent'
import { tokenToUser } from '../utils/transforms'

const BASE_URL = process.env.API_HOST
const REGISTER_URL = BASE_URL + '/api/v1/users'
const LOGIN_URL = BASE_URL + '/api/v1/users/login'
const ORGANIZATION_REGISTER_URL = BASE_URL + '/api/v1/organizations'

var token = window.localStorage.getItem('karma-token')

function storeToken (t) {
  window.localStorage.setItem('karma-token', t)
  token = t
}

export function postLoginCredentials (email, password) {
  return new Promise((resolve, reject) => {
    request
      .post(LOGIN_URL)
      .send({email, password})
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        storeToken(res.body.token)
        resolve(tokenToUser(token))
      })
  })
}

export function postNewUser (user) {
  return new Promise((resolve, reject) => {
    request
      .post(REGISTER_URL)
      .send({user})
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        storeToken(res.body.token)
        resolve(tokenToUser(token))
      })
  })
}

export function postNewOrganization (organization) {
  return new Promise((resolve, reject) => {
    request
      .post(ORGANIZATION_REGISTER_URL)
      .send({organization: organization})
      .set('token', token)
      .end((err, res) => {
        if(err) {
          return reject(err)
        }
        resolve(res.body.organization)
      })
  })
}
