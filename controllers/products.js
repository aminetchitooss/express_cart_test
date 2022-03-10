const asyncWrapper = require("../middleware/async-wrapper");
const { Product } = require("../models/Product");

const getAllProducts = asyncWrapper(async (req, res, next) => {
  const { available, company, sort } = req.query;

  const objectQuery = {};

  if (available) objectQuery.available = available === "true";
  if (company) objectQuery.company = company;

  let results = Product.find(objectQuery);
  if (sort) {
    results = results.sort("price");
  }
  const products = await results;
  res.status(200).json({ products, total: products.length });
});

const createProduct = asyncWrapper(async (req, res, next) => {
  const addedProdcut = await Product.create(req.body);
  res.status(201).json({ addedProdcut });
});

const getSingleProduct = asyncWrapper(async (req, res, next) => {
  const { id: _id } = req.params;
  const foundProduct = await Product.findOne({ _id });
  if (!foundProduct) return res.status(404).send({ msg: `No product found by this id ${_id}` });
  res.status(200).json({ foundProduct });
});

const updateProduct = asyncWrapper(async (req, res, next) => {
  const { id: _id } = req.params;
  const foundProduct = await Product.findOneAndUpdate({ _id }, req.body, { new: true, runValidators: true });
  if (!foundProduct) return res.status(404).send({ msg: `No product found by this id ${_id}` });
  res.status(200).json({ foundProduct });
});

const deleteProduct = asyncWrapper(async (req, res, next) => {
  const { id: _id } = req.params;
  const foundProduct = await Product.findByIdAndDelete(_id);
  if (!foundProduct) return res.status(404).json({ msg: `No product found by this id ${_id}` });
  res.status(200).json(foundProduct);
});

module.exports = {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct
};
