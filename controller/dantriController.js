const template = require("../template");
const shopeeVoucher = require("../shopee");
const asyncHandle = require("../middleware/asyncHandle")
const ErrorResponse = require("../utils/ErrorResponse")

const Covid = require("../models/covid")
const Event = require("../models/event")
const HotNew = require("../models/hotnew")
const Society = require("../models/society")
const Sport = require("../models/sport")
const World = require("../models/world")



exports.hotnew = asyncHandle(async (req, res) => {
  const data = await HotNew.find({}).lean().sort({ createdAt: -1 }).limit(5);

  if (!data.length) {
    return next(new ErrorResponse("Có lỗi xảy ra", 200))
  }

  const dataReverse = data.reverse();

  let response = template(dataReverse);
  res.status(200).json(response);
})

exports.event = asyncHandle(async (req, res) => {
  const data = await Event.find({}).lean().sort({ createdAt: -1 }).limit(5);

  if (!data.length) {
    return next(new ErrorResponse("Có lỗi xảy ra", 200))
  }

  const dataReverse = data.reverse();

  let response = template(dataReverse);
  res.status(200).json(response);
})


exports.society = asyncHandle(async (req, res) => {
  const data = await Society.find({}).lean().sort({ createdAt: -1 }).limit(5);

  if (!data.length) {
    return next(new ErrorResponse("Có lỗi xảy ra", 200))
  }

  const dataReverse = data.reverse();

  let response = template(dataReverse);
  res.status(200).json(response);
})

exports.sport = asyncHandle(async (req, res) => {
  const data = await Sport.find({}).lean().sort({ createdAt: -1 }).limit(5);

  if (!data.length) {
    return next(new ErrorResponse("Có lỗi xảy ra", 200))
  }

  const dataReverse = data.reverse();

  let response = template(dataReverse);
  res.status(200).json(response);
})

exports.world = asyncHandle(async (req, res) => {
  const data = await World.find({}).lean().sort({ createdAt: -1 }).limit(5);

  if (!data.length) {
    return next(new ErrorResponse("Có lỗi xảy ra", 200))
  }

  const dataReverse = data.reverse();

  let response = template(dataReverse);
  res.status(200).json(response);
})

exports.shopee = asyncHandle(async (req, res, next) => {
  let url = req.query.url;
  let page = req.query.page;
  res.json({
    messages: await shopeeVoucher(url, page),
  });
})

exports.covid = asyncHandle(async (req, res, next) => {
  const data = await Covid.find({}).lean().sort({ createdAt: -1 }).limit(5);

  if (!data.length) {
    return next(new ErrorResponse("Có lỗi xảy ra", 200))
  }

  const dataReverse = data.reverse();

  let response = template(dataReverse);
  res.status(200).json(response);
})

