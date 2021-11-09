var CronJob = require("cron").CronJob;
const axios = require("axios");
const cheerio = require("cheerio");

const crawl = require("../utils/crawl")

const Covid = require("../models/covid")
const Event = require("../models/event")
const HotNew = require("../models/hotnew")
const Society = require("../models/society")
const Sport = require("../models/sport")
const World = require("../models/world")

const covidCron = new CronJob("0 */5 * * * *", async () => {
  crawl(Covid, "https://dantri.com.vn/suc-khoe/dai-dich-covid-19.htm")
});


const hotNew = async () => {
  console.log("run");
  const response = await axios.get(
    "https://dantri.com.vn",
  );

  const DANTRILINK = "https://dantri.com.vn/";

  const $ = cheerio.load(response.data);

  let titles = $(".highlight-event .news-item__title > a");

  let titleHotNew
  for (let i = 0; i < 5; i++) {

    titleHotNew = titles[i].children[0].data.trim();

    await HotNew.create({
      title: titleHotNew,
      link: DANTRILINK + titles[i].attribs.href,
      img: 'https://cdnweb.dantri.com.vn/bundle/static/assets/lg_dantri_dktop1.svg?v=1109105633',
    });
  }
}

const hotNewCron = new CronJob("0 */5 * * * *", hotNew);

const eventCron = new CronJob("0 */5 * * * *", () => {
  crawl(Event, "https://dantri.com.vn/su-kien.htm")
});

const societyCron = new CronJob("0 */5 * * * *", () => {
  crawl(Society, "https://dantri.com.vn/xa-hoi.htm")
});

const sportCron = new CronJob("0 */5 * * * *", () => {
  crawl(Sport, "https://dantri.com.vn/the-thao.htm")
});

const worldCron = new CronJob("0 */5 * * * *", () => {
  crawl(World, "https://dantri.com.vn/the-gioi.htm")
});

module.exports = {
  start: () => {
    covidCron.start();
    hotNewCron.start();
    eventCron.start();
    sportCron.start();
    societyCron.start();
    worldCron.start();
  },
  startNow: () => {
    crawl(Covid, "https://dantri.com.vn/suc-khoe/dai-dich-covid-19.htm")
    crawl(Event, "https://dantri.com.vn/su-kien.htm")
    crawl(Society, "https://dantri.com.vn/xa-hoi.htm")
    crawl(Sport, "https://dantri.com.vn/the-thao.htm")
    crawl(World, "https://dantri.com.vn/the-gioi.htm")
    hotNew();
  }
}