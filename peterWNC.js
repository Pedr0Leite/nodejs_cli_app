#!usr/bin/node
const yargs = require("yargs");

const options = yargs
  .usage("Usage: -w <city>")
  .option("w", {
    alias: "city",
    describe: "Your city",
    type: "string",
    demandOption: false,
  })
  .usage("Usage: -n <newspaper>")
  .option("n", {
    alias: "option",
    describe:
      "Newspaper option \n 1: JN\n2: Publico\n3: CNN\n4: Noticiais ao Minuto",
    type: "number",
    demandOption: false,
  })
  .usage("Usage: -c <cripto symbol>")
  .option("c", {
    alias: "symbol",
    describe: "CriptoCurrency Symbol",
    type: "string",
    demandOption: false,
  }).argv;

const argSelected = process.argv[2];

if (argSelected == "-w") {
  (async () => {
    process.env.CITY = options.city;
    const getWeather = require("./controllers/weather");
    const weatherInfo = await getWeather();
    console.log(
      `Today in ${options.city} the weather is:
Sky: ${weatherInfo[0]["$"].skytextday} 
lowest temperatures:  ${weatherInfo[0]["$"].low} ºC
highest temperatures: ${weatherInfo[0]["$"].high} ºC`
    );
  })();
} else if (argSelected == "-n") {
  (async () => {
    process.env.NEWS = options.option;
    const getNews = require("./controllers/news");
    const newsInfo = await getNews();
    console.log("newsInfo :", newsInfo);
  })();
} else if (argSelected == "-c") {
  (async () => {
    process.env.CRIPTO = options.symbol;
    const getCripto = require("./controllers/criptocoin");
    const criptoInfo = await getCripto();
    console.log(
      `${criptoInfo[0][0].name} current value is ${Math.ceil(
        criptoInfo[0][0].quote.USD.price
      )} $`
    );
  })();
} else {
  console.log(
    "\n**********************************************" +
      "\n*  Welcome to Pedro first CLI app!           *" +
      "\n* -w  <city name>                            *" +
      "\n* -n  <newspaper options> (for help, --help) *" +
      "\n* -c  <criptocurrency symbol>                *" +
      "\n**********************************************"
  );
  console.log("\nUsage example: node .\/peterWNC.js -w 'Porto'\n");
}
