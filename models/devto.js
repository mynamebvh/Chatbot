const mongoose = require("mongoose");
const { Schema } = mongoose;

const Devto = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      default:
        "https://thepracticaldev.s3.amazonaws.com/i/6hqmcjaxbgbon8ydw93z.png",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Devto", Devto);
