const express = require("express");
const router = express.Router();
const dantriController = require("./controller/dantriController");
const shopeeController = require("./controller/shoppeController");
const covidController = require("./controller/covidController");

router.get("/api/v1/covid", dantriController.covid);
router.get("/api/v1/shopee", dantriController.shopee);
router.get("/api/v1/event", dantriController.event);
router.get("/api/v1/hotnew", dantriController.hotnew);
router.get("/api/v1/society", dantriController.society);
router.get("/api/v1/sport", dantriController.sport);
router.get("/api/v1/world", dantriController.world);

router.get("/api/v1/shopee", shopeeController.voucherShopee);

router.get("/api/v1/covid-by-city", covidController.dataCovid);
module.exports = router;
