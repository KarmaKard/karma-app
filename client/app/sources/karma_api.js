import request from 'superagent'
import { tokenToUser } from '../utils/transforms'

const BASE_URL = process.env.API_HOST
const REGISTER_URL = BASE_URL + '/api/v1/users'
const LOGIN_URL = BASE_URL + '/api/v1/users/login'
const ORGANIZATIONS_URL = BASE_URL + '/api/v1/organizations'
const MANAGE_ORGANIZATIONS_URL = ORGANIZATIONS_URL + '/manage'
const DEALS_URL = BASE_URL + '/api/v1/deals'


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
      .post(ORGANIZATIONS_URL)
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
      .get(ORGANIZATIONS_URL)
      .set('token', token)
      .end((err, res) => {
        if(err) {
          return reject(err)
        }
        resolve(res.body.organizations)
      })
  })
}

export function getOrganization (id) {
  return new Promise((resolve, reject) => {
    request
      .get(ORGANIZATIONS_URL + '/' + id)
      .set('token', token)
      .end((err, res) => {
        if(err) {
          return reject(err)
        }
        resolve(res.body.organization)
      })
  })
}

export function updateOrganization (organization) {
  return new Promise((resolve, reject) => {
    request
      .put(ORGANIZATIONS_URL + "/" + organization.id)
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

export function postDeal(deal){
  return new Promise ((resolve, reject) => {
    request
      .post(DEALS_URL)
      .send({deal})
      .set('token', token)
      .end((err, res) => {
        if(err) {
          return reject(err)
        }
        resolve(res.body.deal)
      })
  })
}

export function updateDeals(deals){
  return new Promise ((resolve, reject) => {
    request
      .put(DEALS_URL)
      .send({deals})
      .set('token', token)
      .end((err, res) => {
        if (err) {
          return reject(err)
        }

        resolve(res.body.deals)
      })

  })
}

export function getDeals () {
  return new Promise((resolve, reject) => {
    request
      .get(DEALS_URL)
      .set('token', token)
      .end((err, res) => {
        if(err) {
          return reject(err)
        }
        resolve(res.body.deals)
      })
  })
}

