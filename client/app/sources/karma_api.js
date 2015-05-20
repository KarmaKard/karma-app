import request from 'superagent'
import { tokenToUser } from '../utils/transforms'

const BASE_URL = process.env.API_HOST
const REGISTER_URL = BASE_URL + '/api/v1/users'
const LOGIN_URL = BASE_URL + '/api/v1/users/login'
const ORGANIZATION_URL = BASE_URL + '/api/v1/organizations'
const MANAGE_ORGANIZATIONS_URL = ORGANIZATION_URL + '/manage'


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
      .post(ORGANIZATION_URL)
      .send({organization})
      .set('token', token)
      .end((err, res) => {
        if(err) {
          return reject(err)
        }
        resolve(res.body.organization)
      })
  })
}

export function getOrganizations () {
  return new Promise((resolve, reject) => {
    request
      .get(ORGANIZATION_URL)
      .set('token', token)
      .end((err, res) => {
        if(err) {
          return reject(err)
        }
        resolve(res.body.organizations)
      })
  })
}


export function getManagedOrganizations () {
  return new Promise((resolve, reject) => {
    request
      .get(MANAGE_ORGANIZATIONS_URL)
      .set('token', token)
      .end((err, res) => {
        if(err) {
          return reject(err)
        }
        resolve(res.body.organizations)
      })
  })
}

