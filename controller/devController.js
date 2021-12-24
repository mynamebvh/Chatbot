const axios = require("axios");
const cheerio = require("cheerio");

const asyncHandle = require("../middleware/asyncHandle");
const Devto = require("../models/devto");
const Viblo = require("../models/viblo");

const template = require("../template");

module.exports.devtoPost = asyncHandle(async (req, res) => {
  const { type = "relevant" } = req.query;

  const result = await Devto.find({ type })
    .sort({ createdAt: 1 })
    .limit(5)
    .lean();

  res.json(template(result, "Nguồn dev.to"));
});

module.exports.vibloPost = asyncHandle(async (req, res) => {
  const { type = "trending" } = req.query;

  let result = await Viblo.find({ type: type.toLowerCase() })
    .lean()
    .sort({ createdAt: 1 })
    .limit(5);

  res.json(template(result, "Nguồn Viblo"));
});
