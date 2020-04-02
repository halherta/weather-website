const request = require('request')

const geocode = (address, cb) => {
    const urlGeocode = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiaGFsaGVydGEiLCJhIjoiY2s4Z2Q4N2Z5MDAxaTNobzV4YnRxNXBtZiJ9.4L3T1EpBoFgEjhez6JjU0Q&limit=1'
    request({
        url: urlGeocode,
        json: true
    }, (err,{body})=>{
        if(err){ 'Unable to connect to weather service'
            cb('Unable to connect to weather service\n' + err, undefined)

        }else if(!body.features){
            cb("Invalid city / location name", undefined) 
        } else if (body.features.length === 0 ){
            cb("Invalid city / location name", undefined) 
        }else{
            data = {
                loc:  body.features[0].place_name,
                loData: body.features[0].center[0],
                laData: body.features[0].center[1]
            }
            cb(undefined,data)
        }
    })
}

module.exports = geocode