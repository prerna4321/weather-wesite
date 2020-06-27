const request = require('request');

const geoCode = (address, callback = ()=>{})=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoicHJlcm5hMzIxIiwiYSI6ImNrYjR4eDJkaTBuaXEycm85d2ZiYWR3MGoifQ.8VmRZigcF_0I2Vsi642otA&limit=1";
    request({url , json : true}, (error, {body})=>{
        if(error){
            callback("unable to connect to location service", undefined);
        }else if( body.features.length == 0 ){
            callback("unable to connect to find location try another search", undefined);
        }else{
            callback(undefined, 
                {
                    location : body.features[0].place_name, 
                    longitude : body.features[0].center[0],
                    latitude : body.features[0].center[1]
                }
            );
        }
    });
};

module.exports = geoCode;