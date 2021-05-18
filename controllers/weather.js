const axios = require('axios');
const parseString = require('xml2js').parseString;

module.exports = async function getWeather(){
const _url = 'http://weather.service.msn.com/find.aspx?src=outlook&weadegreetype=C&culture=en-US&weasearchstr=' + process.env.CITY;
var finalArr = [];

await axios({
    method: 'get',
    url: _url,
  }).then(function (response) {
        parseString(response.data, function (err, result) {
            finalArr.push(result.weatherdata.weather[0].forecast[1]);
        });
    });
    return finalArr;
}