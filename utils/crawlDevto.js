const axios = require("axios");
const cheerio = require("cheerio");
const Devto = require("../models/devto");

module.exports = async () => {
  const { data } = await axios.get(`https://dev.to/top/week`);

  const $ = cheerio.load(data);

  for (let i = 0; i < 4; i++) {
    await Devto.create({
      title: $(".crayons-story__title > a")[i].children[0].data.trim(),
      link: "https://dev.to/" + $(".crayons-story__title > a")[i].attribs.href,
    });
  }
};
