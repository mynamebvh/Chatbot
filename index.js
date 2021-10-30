const axios = require("axios");
const cheerio = require("cheerio");
require("dotenv").config();

var CronJob = require("cron").CronJob;

const express = require("express");
const db = require("./db");
const Post = require("./post.schema");
const template = require("./template");
const shopeeVoucher = require("./shopee");

const app = express();
const port = 3000;

db();

var job = new CronJob("0 */10 * * * *", async () => {
  console.log("run");
  const response = await axios.get(
    "https://dantri.com.vn/suc-khoe/dai-dich-covid-19.htm",
  );

  const DANTRILINK = "https://dantri.com.vn/";
  const $ = cheerio.load(response.data);

  let titles = $(".news-item__title");

  let links = $(".news-item__title > a");

  let imgs = $(".dt-thumbnail > img");

  for (let i = 0; i < 5; i++) {
    let imgUrl;
    if (i == 4) imgUrl = imgs[i].attribs["data-src"];
    else imgUrl = imgs[i].attribs.src;
    await Post.create({
      title: $(titles[i]).text().trim(),
      link: DANTRILINK + links[i].attribs.href,
      img: imgUrl,
    });
  }
});

job.start();

app.get("/api/shopee", async (req, res) => {
  let url = req.query.url;
  let page = req.query.page;
  res.json({
    messages: await shopeeVoucher(url, page),
  });
});

app.get("/api/start", async (req, res) => {
  console.log("run now");
  const response = await axios.get(
    "https://dantri.com.vn/suc-khoe/dai-dich-covid-19.htm",
  );

  const DANTRILINK = "https://dantri.com.vn/";
  const $ = cheerio.load(response.data);

  let titles = $(".news-item__title");

  let links = $(".news-item__title > a");

  let imgs = $(".dt-thumbnail > img");

  for (let i = 0; i < 5; i++) {
    let imgUrl;
    if (i == 4) imgUrl = imgs[i].attribs["data-src"];
    else imgUrl = imgs[i].attribs.src;
    await Post.create({
      title: $(titles[i]).text().trim(),
      link: DANTRILINK + links[i].attribs.href,
      img: imgUrl,
    });
  }

  res.json({
    msg: "success",
  });
});

app.get("/api/covid", async (req, res) => {
  const data = await Post.find({}).lean().sort({ createdAt: -1 }).limit(5);
  const dataReverse = data.reverse();

  let response = template(dataReverse);
  res.json(response);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
