const mongoose = require("mongoose");
const { Schema } = mongoose;

const Covid = new Schema(
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

module.exports = mongoose.model("Covid", Covid);
