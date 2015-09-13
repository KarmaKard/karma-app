import config from 'config'

export async function getGeocode (street, zip) {
  var geocoderProvider = 'google'
  var httpAdapter = 'https'
  var extra = {
    apiKey: config.googleGeocoder.key 
  }

  var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter, extra)

  var address = street + ' ' + zip
  var returnedAddress = await geocoder.geocode(address)

  return returnedAddress
}
