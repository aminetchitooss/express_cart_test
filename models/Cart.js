const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  iduser: {
    type: String,
    required: [true, "iduser must be provided"]
  },
  idproduct: {
    type: String,
    required: [true, "idproduct must be provided"]
  },
  quantity: {
    type: Number,
    required: [true, "quantity must be provided"]
  }
});

var Cart = mongoose.model("Cart", CartSchema);
module.exports = { Cart, CartSchema };
