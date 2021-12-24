const axios = require("axios");
const asyncHandle = require("../middleware/asyncHandle");

module.exports.qrGenerator = asyncHandle(async (req, res) => {
  let { text } = req.query;

  res.json({
    messages: [
      {
        attachment: {
          type: "image",
          payload: {
            url: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${text}`,
          },
        },
      },
    ],
  });
});
