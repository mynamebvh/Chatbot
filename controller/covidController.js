const axios = require("axios");
const cheerio = require("cheerio");

const asyncHandle = require("../middleware/asyncHandle");

module.exports.dataCovid = asyncHandle(async (req, res) => {
  let { nameCity } = req.query;

  const { data } = await axios.get(
    "https://static.pipezero.com/covid/data.json",
  );

  const result = data.locations.find((e) => {
    return e.name.toLowerCase().includes(nameCity.toLowerCase());
  });

  if (result) {
    res.json({
      messages: [
        { text: `🏣 Thành phố: ${result.name}` },
        { text: `😷 Số ca mắc hôm nay: ${result.casesToday} ca` },
      ],
    });
  } else {
    res.json({
      messages: [{ text: `🚫 Tên thành phố sai` }],
    });
  }
});

module.exports.situationCovid = asyncHandle(async (req, res) => {
  const { data } = await axios.get(
    "https://covid19.gov.vn/ajax/dien-bien-dich.htm",
  );

  const $ = cheerio.load(data);

  res.json({
    messages: [
      { text: $(".box-focus-sapo > p")[0].children[0].data },
      { text: $(".box-focus-sapo > p")[1].children[0].data },
    ],
  });
});
