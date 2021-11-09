const axios = require("axios");
const cheerio = require("cheerio");

module.exports = async (model, link) => {

  console.log("run");
  const response = await axios.get(
    link,
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

    await model.create({
      title: $(titles[i]).text().trim(),
      link: DANTRILINK + links[i].attribs.href,
      img: imgUrl,
    });
  }
}
