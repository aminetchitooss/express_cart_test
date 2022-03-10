const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "product name must be provided"]
  },
  price: {
    type: Number,
    required: [true, "product price must be provided"]
  },
  available: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 4
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  company: {
    type: String,
    enum: {
      values: ["Zara", "ikea", "Castorama", "Conforma"],
      message: "{VALUE} is not supported"
    }
  }
});

var Product = mongoose.model("Products", ProductSchema);
module.exports = { Product, ProductSchema };
