const express = require("express");
const router = express.Router();
const { createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct } = require("../controllers/products");

router.route("/").get(getAllProducts).post(createProduct);
router.route("/:id").get(getSingleProduct).patch(updateProduct).delete(deleteProduct);

module.exports = router;
