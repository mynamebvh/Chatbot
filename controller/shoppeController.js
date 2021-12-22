
const shopeeVoucher = require("../shopee")
const asyncHandle = require("../middleware/asyncHandle")

module.exports.voucherShopee = asyncHandle(async (req, res) => {
  let url = req.query.url;
  let page = req.query.page;
  res.json({
    messages: await shopeeVoucher(url, page),
  });
})