const axios = require("axios");
const asyncHandle = require("../middleware/asyncHandle");

module.exports.randomFood = asyncHandle(async (req, res) => {
  const PAGESIZE = 10;

  let pageIndex = getRndInteger(1, 100);

  let foodIndex = getRndInteger(0, 9);

  const { data } = await axios.get(
    `https://www.cooky.vn/collection/getcollections?q=&pageIndex=${pageIndex}&pageSize=${PAGESIZE}`,
  );

  let result = data.Items[foodIndex];

  res.json({
    messages: [
      {
        attachment: {
          type: "template",
          payload: {
            template_type: "generic",
            image_aspect_ratio: "square",
            elements: [
              {
                title: result.Title,
                image_url: result.PhotoUrl,
                subtitle: result.Description,
                buttons: [
                  {
                    type: "web_url",
                    url: "https://www.cooky.vn/" + result.PublicUrl,
                    title: "Xem chi tiết",
                  },
                ],
              },
            ],
          },
        },
      },
    ],
  });
});

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
