const mongoose = require("mongoose");
const { Schema } = mongoose;

const Viblo = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
        type: String,
        enum: ["trending", "newest"]
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

module.exports = mongoose.model("Viblo", Viblo);
