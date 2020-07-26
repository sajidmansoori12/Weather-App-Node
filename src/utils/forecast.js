const request = require('request')
const forecast = (location,callback)=>{
    const url = `http://api.openweathermap.org/data/2.5/weather?q=` + location + `&APPID=55b43e3f2c11abe22623fa9ffa2a454b`
    request({ url: url, json: true }, (error, response) => {
        // const jsonData = JSON.parse(response.body) since we have setup json to true we don't need this line
        if(error){ 
            // console.log('Unable to connect to weather service !')
            callback(error,undefined)
        }
        else{
            callback(undefined,response)
        }    
    })
}

module.exports = forecast