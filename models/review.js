const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  author: new mongoose.Schema({
    _id: { type: String, required: true },
    username: { type: String, required: true },
  }),
  comment: String,
  rating: { type: Number, required: true },
});

module.exports = mongoose.model("Review", reviewSchema);
