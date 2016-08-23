var http = require("http");

//Problem: Get the weather information in a specific location by zip code
//Solution: use Node.js to connect to the weather api to get location weather information

function printMessage(location, weather, city){
    var message = location + " weather info: " + weather + " at " + city;
    console.log(message);
};
function printError(error){
    console.error("Got Error: " + error.message);
};


function get(location){
    
var request = http.get("http://api.openweathermap.org/data/2.5/weather?zip=" + location +",us&units=imperial", function(response){
    console.log("Got response: " + response.statusCode);
    var body = "";
    //Read the data
    response.on('data', function(chunk){
       body += chunk; 
    });
    response.on('end', function(){
        if(response.statusCode === 200){
            try{
                //Parse the data
                var weather = JSON.parse(body);
                //Print the data
                printMessage(location, weather.main.temp, weather.name);
                console.log("Weather found with OpenWeatherMap");
            } catch(error){
                //Parse Error
                printError(error);
            }
        } else{
            PrintErrorMessage({message: "There was an error getting the profile for " + weather + ". (" + http.STATUS_CODES[response.statusCode] + ")"});
        };
    });
    
});
    request.on('error', printError);
    
};
                  //  effef0a14faed6eee8fff2011767809a
   
    


module.exports.get = get;
