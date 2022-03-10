const express = require("express");
const router = express.Router();
const { addProductToUserCart, removeProductFromUserCart } = require("../controllers/cart");

router.route("/addProductToCart").post(addProductToUserCart);
router.route("/removeProductFromCart/:id").delete(removeProductFromUserCart);

module.exports = router;
