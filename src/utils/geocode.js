const request = require('postman-request')

const geocode = (data, callback) => {
    const url_place = 'http://api.positionstack.com/v1/forward?access_key=621961d8a1546607ca5a42c6c15dc7e9&query='+ data +' &limit=1'
  request ({url : url_place , json : true}, (error, response) => {
    // console.log(response.body.data[0])
    if (error) {
     callback(undefined, 'Check your url make sure it is correct')
    } else if (response.body.data === undefined) {
      callback(undefined, 'Input a valid string')
    }
    else if (response.body.data[0] === undefined ) {
    callback(undefined, 'unable to find loaction')
    } else {
    callback({
      longitude :response.body.data[0].longitude ,
      latitude :response.body.data[0].latitude,
      location : response.body.data[0].name,
      label : response.body.data[0].label
      }, undefined)
    }
  })
  }

module.exports=geocode