const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/3343b28b0fda8572d7df2e60ae663a9b/' + latitude + ',' + longitude
    request({url , json : true},(error,response) => {
        if(error){
            callback('Unable to connect to weather service', undefined)
        } else if(response.body.error){
            callback('Unable to find location', undefined)
        } else{
            callback(undefined, {
                temp : response.body.currently.temperature,
                precipProp : response.body.currently.precipProbability
            })
        }
    })

}

module.exports = forecast