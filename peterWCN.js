#!usr/bin/node
const yargs = require('yargs');

console.log(
'**********************************************'+
'\n*  Welcome to Pedro first CLI app!           *'  +
'\n* -w  <city name>                            *'  +
'\n* -n  <1: JN | 2: Publico | 3: CNN | 4: All> *'  + 
'\n* -c  <criptocurrency symbol>                *'  + 
'\n**********************************************');

const options = yargs
.usage("Usage: -w <city>")
.option("w", { alias: "city", describe: "Your city", type: "string", demandOption: false })
.usage("Usage: -n <newspaper>")
.option("n", { alias: "option", describe: "Newspaper option", type: "string", demandOption: false })
.usage("Usage: -c <cripto symbol>")
.option("c", { alias: "symbol", describe: "CriptoCurrency Symbol", type: "string", demandOption: false })
.argv;

const argSelected = process.argv[2];

if(argSelected == "-w"){
    (async () => {
    process.env.CITY = options.city;
    const getWeather = require('./controllers/weather');
    const weatherInfo = await getWeather();
    console.log('weatherInfo :', weatherInfo[0]['$']);
})();
}else if(argSelected == '-n'){
    (async () => {
        process.env.NEWS = options.option;
        // console.log(' process.env.NEWS :',  process.env.NEWS);
        const getNews = require('./controllers/news');
        const newsInfo = await getNews();
        console.log('newsInfo :', newsInfo);
    })();
}else if(argSelected == '-c'){
    (async () => {
        process.env.CRIPTO = options.symbol;
        // console.log('process.env.CRIPTO :', process.env.CRIPTO);
        const getCripto = require('./controllers/criptocoin');
        const criptoInfo = await getCripto();
        console.log(`${criptoInfo[0][0].name} current value is ${criptoInfo[0][0].quote.USD.price} $`);
    })()
}else{
    console.log('\n---+++   Please choose an argument :)   +++---');
}