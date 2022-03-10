const mongoose = require("mongoose");
const { CartSchema } = require("./Cart");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username must be provided"]
  },
  email: {
    type: String,
    required: [true, "product price must be provided"]
  },
  cart: [CartSchema]
});

var User = mongoose.model("Users", UserSchema);
module.exports = { User, UserSchema };
