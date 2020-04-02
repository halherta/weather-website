const request = require('request')

const forecast = (lon, lat, cb)=>{
    const urlWeather = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=60a9313140298ac60088b6808b258563&units=metric'
    request({
        url: urlWeather,
        json: true
    }, (err, {body})=>{
        if(err){
                cb('Unable to connect to weather service\n' + err,undefined)
        }else if(body.cod != '200'){
            cb('Error! Code: '+body.cod+'. '+ body.message, undefined)
        }else{
            const data = {
                temp: body.main.temp,
                feels_like:  body.main.feels_like,
                t_high: body.main.temp_max,
                t_low: body.main.temp_min
            }
            cb(undefined, data)
        }
    } )
}



module.exports=forecast