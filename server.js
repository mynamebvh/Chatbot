require("dotenv").config();

const express = require("express");

const router = require("./route")
const db = require("./db");

const cronJob = require("./cronjob/cronjob")
const errorHandle = require("./middleware/errorHandle")

const app = express();
const port = 3000;

db();

cronJob.start();

app.use(router)

app.use(errorHandle)


app.get("/start", (req, res) => {
  cronJob.startNow();
  res.status(200).json({ msg: "Thành công" })
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
