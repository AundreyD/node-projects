var weather = require("./weather");

var input = process.argv.slice(2);

input.forEach(weather.get);

console.log("Here's your weather");



