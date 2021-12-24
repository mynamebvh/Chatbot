const Devto = require("../models/devto");
const asyncHandle = require("../middleware/asyncHandle");
const template = require("../template");

module.exports.devtoPost = asyncHandle(async (req, res) => {
  const result = await Devto.find({}).lean().sort({ createdAt: -1 }).limit(5);

  res.json(template(result, "Nguồn dev.to"));
});
