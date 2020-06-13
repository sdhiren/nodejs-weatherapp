const request = require('request')


function forecast(longitude, lattitide, callback) {
    const url = "http://api.weatherstack.com/current?access_key=b52162aa011785546bcf318fd8c2e4b9&query=" + longitude+","+ lattitide
         request({url, json: true}, (error, {body})=> {          
                if(error){
                    callback('Unable to connect to weather service at the moment!') 
                }
                else if(body.error){
                    callback(body.error.info)
                }else{
                    console.log(body.current)
                    callback(null,`${body.current.weather_descriptions[0]} :  It is currently ${body.current.temperature} degrees out. But it feelslike ${body.current.feelslike}.
                    \n The Humidity is ${body.current.humidity} percent`)
                }                               
    })
}


module.exports = forecast