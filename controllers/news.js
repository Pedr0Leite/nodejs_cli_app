const puppeteer = require("puppeteer");

module.exports = async function newsCatcher(option) {
  option = process.env.NEWS;
  var finalObj = {};
  let jornal_JN = "https://jn.pt";
  let journal_publico = "https://publico.pt";
  let journal_cnn = "https://edition.cnn.com/";

  let browser = await puppeteer.launch({
    headless: true,
  });
  let page = await browser.newPage();

  if (option == "1") {
    await page.goto(jornal_JN, { waitUntil: "networkidle2" });

    let data_JN = await page.evaluate(() => {
      let news_jn = [];
      const headlines = document
        .querySelectorAll(
          'div[class="t-g1-l1-i-i"] > article > header > h2 > a'
        ) //grab all headlines
        .forEach((info) => {
          news_jn.push(info.text);
        });

      return news_jn;
    });
    await browser.close();
    return data_JN;
  } else if (option == "2") {
    await page.goto(journal_publico, { waitUntil: "networkidle2" });

    let data_Publico = await page.evaluate(() => {
      let news_publico = [];
      const headlines = document
        .querySelectorAll(
          'li[class="stack__slice__item"] > article > div[class="card__inner"] > div[class="card__content"] > div > h3 > a[class="card__faux-block-link"]'
        )
        .forEach((info) => {
          let news_fixed = info.text.trim();
          news_publico.push(news_fixed);
        });

      return news_publico;
    });
    await browser.close();
    return data_Publico;
  } else if (option == "3") {
    await page.goto(journal_cnn, { waitUntil: "networkidle2" });

    let data_cnn = await page.evaluate(() => {
      const news_cnn = Array.from(
        document
          .querySelector(".zn-intl_homepage1-zone-1")
          .querySelectorAll("span.cd__headline-text.vid-left-enabled")
      ).map((e) => e.innerHTML);
      return news_cnn;
    });

    await browser.close();
    return data_cnn;
  } else if (option == "4") {
    //JN PART
    await page.goto(jornal_JN, { waitUntil: "networkidle2" });

    let data_JN = await page.evaluate(() => {
      let news_jn = [];
      const headlines = document
        .querySelectorAll(
          'div[class="t-g1-l1-i-i"] > article > header > h2 > a'
        ) //grab all headlines
        .forEach((info) => {
          news_jn.push(info.text);
        });

      return news_jn;
    });

    //Add JN part to finalObj
    finalObj["jn"] = data_JN;

    //PUBLICO PART
    await page.goto(journal_publico, { waitUntil: "networkidle2" });

    let data_Publico = await page.evaluate(() => {
      let news_publico = [];
      const headlines = document
        .querySelectorAll(
          'li[class="stack__slice__item"] > article > div[class="card__inner"] > div[class="card__content"] > div > h3 > a[class="card__faux-block-link"]'
        )
        .forEach((info) => {
          let news_fixed = info.text.trim();
          news_publico.push(news_fixed);
        });

      return news_publico;
    });

    //Add Publico part to finalObj
    finalObj["publico"] = data_Publico;

    //CNN PART
    await page.goto(journal_cnn, { waitUntil: "networkidle2" });

    let data_cnn = await page.evaluate(() => {
      const news_cnn = Array.from(
        document
          .querySelector(".zn-intl_homepage1-zone-1")
          .querySelectorAll("span.cd__headline-text.vid-left-enabled")
      ).map((e) => e.innerHTML);
      return news_cnn;
    });

    //Add CNN part to finalObj
    finalObj["cnn"] = data_cnn;

    await browser.close();
    return finalObj;
  } else {
    return "Please, choose a valid option";
  }
};
