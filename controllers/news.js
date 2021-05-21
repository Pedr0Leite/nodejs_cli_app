const axios = require("axios");
const parseString = require('xml2js').parseString;

module.exports = async function newsCatcher(option) {
  option = process.env.NEWS;
  var finalObj = {};
  let jornal_JN = 'http://feeds.jn.pt/JN-Ultimas';
  let journal_publico = 'https://feeds.feedburner.com/PublicoRSS';
  let journal_cnn = 'http://rss.cnn.com/rss/edition.rss';
  let journal_noticiais_ao_minuto = 'https://www.noticiasaominuto.com/rss/ultima-hora';

  if (option == "1") {

    return getNews(jornal_JN);
    
  } else if (option == "2") {
    
    return getNews(journal_publico);
    
  } else if (option == "3") {
    
    return getNews(journal_cnn);
    
  } else if (option == "4") {
    
    return getNews(journal_noticiais_ao_minuto);
    
  } else {
    return "Please, choose a valid option";
  }
};

async function getNews(urlSearch) {

  const finalArr = [];
  
  await axios({
    method: "get",
    url: urlSearch
  }).then(function (response) {
  parseString(response.data, function (err, result) {
  result.rss.channel[0].item.forEach(headline => finalArr.push(headline.title[0]));
});
});
  return finalArr;
};