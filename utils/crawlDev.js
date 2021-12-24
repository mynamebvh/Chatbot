const axios = require("axios");
const cheerio = require("cheerio");
const Devto = require("../models/devto");
const Viblo = require("../models/viblo");

module.exports.devto = async () => {
  crawlDevto("relevant");
  crawlDevto("week");
  crawlDevto("month");
  crawlDevto("year");
};

module.exports.viblo = () => {
  crawlViblo("https://viblo.asia/trending", "trending");
  crawlViblo("https://viblo.asia/newest", "newest");
};

const crawlViblo = async (url, type) => {
  let { data } = await axios.get(url);

  const $ = cheerio.load(data);

  for (let i = 0; i < 5; i++) {
    await Viblo.create({
      title: $(".post-feed-item__info .word-break.mr-05 > a")[i].children[0]
        .data,
      type,
      link:
        "https://viblo.asia" +
        $(".post-feed-item__info .word-break.mr-05 > a")[i].attribs.href,
      img: "https://images.viblo.asia/51a9952b-af95-4e05-a871-80baa4de839a.png",
    });
  }
};

const crawlDevto = async (type) => {
  const { data } = await axios.get(
    `https://dev.to/${type == "relevant" ? "" : "top/" + type}`
  );

  const $ = cheerio.load(data);

  for (let i = 0; i < 5; i++) {
    await Devto.create({
      title: $(".crayons-story__title > a")[i].children[0].data.trim(),
      link: "https://dev.to/" + $(".crayons-story__title > a")[i].attribs.href,
      type,
    });
  }
};
