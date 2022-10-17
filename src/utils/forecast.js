const request = require('postman-request')

console.log('Making a request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0c54f3efa7dcd0bca60ed31c21c8664d&query=' + longitude + ',' + latitude 

    request({url : url, json: true }, (error, response) => {

  if (error) return callback('Please check your connection', undefined)
  callback(undefined, 'It is '+ response.body.current.weather_descriptions[0] + ' It is currently '+ response.body.current.temperature + ' degrees out And there is ' + response.body.current.precip + '% chance of rain.')
  })
}

module.exports = forecast