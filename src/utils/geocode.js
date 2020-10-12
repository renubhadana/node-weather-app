const request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ address +".json?access_token=pk.eyJ1IjoicmVudWJoYWRhbmEiLCJhIjoiY2tlMWMyc2V5MzMxczMxbHE1YTdweGR2MSJ9.--VVYVYTbrfUA1-KCGL1Tg"
    request({ url, json: true }, (error, { body }) => {
        if(error) {
            callback('Unable to connect to location service!', undefined)
        } else if(body.features.length === 0) {
            callback('Wrong location!', undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[1],
                latitude: body.features[0].center[0],
                Place: body.features[0].place_name
            })
        }
    })
}
 
module.exports = geocode