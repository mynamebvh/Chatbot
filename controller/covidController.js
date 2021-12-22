const axios = require("axios");
const asyncHandle = require("../middleware/asyncHandle");

module.exports.dataCovid = async (req, res) => {
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
};
