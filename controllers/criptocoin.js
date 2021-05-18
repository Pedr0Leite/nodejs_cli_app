console.log("CRIPTO STARTS");
const axios = require("axios");
const dotenv = require("dotenv").config();

const coinKey = process.env.COIN_MARKET_KEY;

module.exports = async function getCripto() {
  const url =
    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
  const headersPart = {
    "X-CMC_PRO_API_KEY": coinKey,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const finalArr = [];

  await axios({
    method: "get",
    url: url,
    headers: headersPart,
    json: true,
    gzip: true,
  }).then(function (response) {
    let cripto = response.data.data.filter(
      (x) => x.symbol == process.env.CRIPTO
    );
    finalArr.push(cripto);
  });
  return finalArr;
};
