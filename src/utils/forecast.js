const request = require('request');
// const geoCode = require('./utils/geocode');

const forecast = ({longitude, latitude} = {}, callback = ()=>{})=>{
    //weather data for weather stack
    const ASSESS_KEY = "4590c86a0950f8d547f79a5155e39bb6";
    const unit = "f";//m for metric/ s or scientific, f for Fahrenheit
    const url =  "http://api.weatherstack.com/current?access_key="+ ASSESS_KEY+"&query=" + latitude+","+longitude +"&units="+unit ;
    request({url, json : true} , (error, {body} = {})=>{
        if(error){
            callback("cannot connect to weather stack service", undefined);
        }else if(body.error){
            callback("unable to find the location", undefined);
        }else{
            callback( undefined,
                { 
                    temperature : body.current.temperature + " "+ unit,
                    weather : body.current.weather_descriptions[0] 
                }
            ); 
        }
        
    });
}
module.exports = forecast;
