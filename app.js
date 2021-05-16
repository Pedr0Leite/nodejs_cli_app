#!usr/bin/node
"use strict";
console.log('INSIDE APP');
console.log(process.argv)

const puppeteer = require('puppeteer');
const weather = require('weather-js');
const dotenv = require("dotenv").config();
const fetch = require("node-fetch");

const coinKey = process.env.COIN_MARKET_KEY;
const [city1, city2, city3, city4] = [process.env.CITY1, process.env.CITY2, process.env.CITY3, process.env.CITY4]

if(process.argv[2] == 'test'){
  console.log('FIRST')
}else if(process.argv[2] == 'bla'){
  console.log('SECOND')
}

//WEATHER PART
// Options:
// search:     location name or zipcode
// degreeType: F or C

weather.find({search: city1, degreeType: 'C'}, function(err, result) {
    if(err) console.log(err);
    // const weather_result = JSON.stringify(result, null, 2);
    // console.log('Location:' , result[0].location);
    // console.log('Current:' , result[0].current);
    // console.log('Skytext:' , result[0].current.skytext);
  });

//NEWS PART

(async ()=>{
    let jornal_JN = "https://jn.pt";
    let publico_P = "https://publico.pt";
    // let cnn = "https://edition.cnn.com/";
    
    let browser = await puppeteer.launch({
        headless: true
    });
    let page = await browser.newPage();

    await page.goto(jornal_JN, {waitUntil: "networkidle2"});

    let data_JN = await page.evaluate(() =>{
        let news_jn = [];
        // let smallerTitle = document.querySelectorAll('article[class="t-g1-l1-am1"] > header > h2 > a').innerText; //its only grabbing one
        const headlines = document.querySelectorAll('div[class="t-g1-l1-i-i"] > article > header > h2 > a') //grab all headlines
        .forEach(info =>{ news_jn.push(info.text);
        });
        
        return {
            // title,
            // headlines,
            news_jn
        }
    });

// console.log(data_JN); // log JN

await page.goto(publico_P, {waitUntil: "networkidle2"});

let data_Publico = await page.evaluate(() =>{
    let news_Publico = [];
    const headlines = document.querySelectorAll('li[class="stack__slice__item"] > article > div[class="card__inner"] > div[class="card__content"] > div > h3 > a[class="card__faux-block-link"]')
    .forEach(info =>{ 
        let news_fixed = info.text.trim();
        news_Publico.push(news_fixed);
    });
    
    return {
        // title,
        // headlines,
        news_Publico
    }
});

// await page.goto(cnn, {waitUntil: "networkidle2"});

// let data_cnn = await page.evaluate(() =>{
//     let news_cnn = [];
//     const headlines = document.querySelectorAll('div[class="column zn__column--idx-2"] > ul[class="cn cn-list-hierarchical-xs cn--idx-2 cn-container_FB2EC938-B2D1-87EC-9465-4C36D2BEEAF4"] > li > article[class="cd cd--card cd--article cd--idx-0 cd--large cd--vertical cd--has-siblings cd--has-media cd--media__image"] > div[class="cd__wrapper"] > div[class="cd__content] > h3[class="cd__headline"] > a > span[class="cd__headline-text vid-left-enabled"] > strong')
//     .forEach(info =>{
//         console.log('INFO: ' + info);
//         // let news_fixed = info.text.trim();
//         // news_cnn.push(news_fixed);
//     });
    
//     return {
//         // title,
//         // headlines,
//         news_cnn
//     }
// });

// console.log(data_cnn); //log Publico

await browser.close();

})();

//COINS PART
const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';
const headersPart = {'X-CMC_PRO_API_KEY': coinKey, "Content-Type": "application/x-www-form-urlencoded"};


async function getCoinInfo(){
  let response = await fetch(url, {
    method: 'GET',
    headers: headersPart,
    json: true,
    gzip: true
  })
  let data = await response.json()
  return data;
}

getCoinInfo().then(data => {  
// console.log('data :', data.data);
  let BTC = data.data.filter(x=> x.symbol == 'BTC')
  let ENJ = data.data.filter(x=> x.symbol == 'ENJ')
  let BTC_price = BTC[0].quote.USD.price;
  let ENJ_price = ENJ[0].quote.USD.price;
  // console.log(JSON.stringify(data, null, 2))


});
