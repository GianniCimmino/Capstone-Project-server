const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: String,
  description: String,
  price: { type: Number, required: true },
  imageUrl: String,
});

module.exports = mongoose.model("Product", productSchema);
