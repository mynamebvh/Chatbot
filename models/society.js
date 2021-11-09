const mongoose = require("mongoose");
const { Schema } = mongoose;

const Society = new Schema(
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
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Society", Society);
