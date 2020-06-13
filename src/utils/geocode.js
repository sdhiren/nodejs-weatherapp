const request = require('request')
const forecast = require('./forecast')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" +encodeURIComponent(address)  +".json?access_token=pk.eyJ1Ijoic2luZ2hkaGlyZW5kcmEwNyIsImEiOiJja2F2aGh2MmExZDZ1MnVtc3IzZXg5a3kzIn0.CdX7JwzrmpRxc47rK0AJzA&limit=1"

        
    request({url, json:true}, (error, {body})=> {
        if(error){
            callback('unable to connect to geo code service')
        }
        else if(body.features.length <1){
            callback('Locatipn not found. Please try another search')
        }else{
            //callback(null,`Longitude : ${response.body.features[0].center[0]} ; Lattitude : ${response.body.features[0].center[1]}`)
            console.log(`Longitude : ${body.features[0].center[0]} ; Lattitude : ${body.features[0].center[1]}`)
            callback(null,body)
        }
    });

}

function callback(error, response){
    if(error){
        console.log(error)
    }
    else{
        console.log(response)
    }
}

module.exports = geocode