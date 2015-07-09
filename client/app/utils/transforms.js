import humps from 'humps'

/**
 * Transform Object with camelCase keys
 * into object with snake_case keys
 */
export function decamelizeObjectKeys (obj) {
  return Object.keys(obj).reduce((newObj, camelKey) => {
    newObj[humps.decamelize(camelKey)] = obj[camelKey]
    return newObj
  }, {})
}

/**
 * Transform Object with snake_case keys
 * into object with camelCase keys
 */
export function camelizeObjectKeys (obj) {
  return Object.keys(obj).reduce((newObj, uKey) => {
    newObj[humps.camelize(uKey)] = obj[uKey]
    return newObj
  }, {})
}

/**
 * Transform a JSON Web Token into a User object
 */
export function tokenToUser (token) {
  // throws JSON Parse error if badly formed token
  return JSON.parse(window.atob(token.split('.')[1]))
}

/**
 * Transform a date to mm/dd/yyyy
 */
export function formatDateString(date) {
    var mm = date.getMonth() + 1
    var dd = date.getDate()
    var yyyy = date.getFullYear()
    var yy = yyyy.toString().substr(2,2);
    return mm + '/' + dd + '/' + yy
}

