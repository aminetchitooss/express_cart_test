const asyncWrapper = require("../middleware/async-wrapper");
const { Cart } = require("../models/Cart");
const { User } = require("../models/User");

const getAllUsers = asyncWrapper(async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({ users });
});

const createUser = asyncWrapper(async (req, res, next) => {
  const addedProdcut = await User.create(req.body);
  res.status(201).json({ addedProdcut });
});

const getCurrentUser = asyncWrapper(async (req, res, next) => {
  const { iduser } = req; // from the auth middle ware
  const foundUser = await User.findById(iduser);
  if (!foundUser) return res.status(404).send({ msg: `No user found by this id ${iduser}` });
  const cart = await Cart.find({ iduser });
  if (!!cart) foundUser.cart = cart;
  res.status(200).json({ foundUser });
});

const updateUser = asyncWrapper(async (req, res, next) => {
  const { id: _id } = req.params;
  const foundUser = await User.findOneAndUpdate({ _id }, req.body, { new: true, runValidators: true });
  if (!foundUser) return res.status(404).send({ msg: `No user found by this id ${_id}` });
  res.status(200).json({ foundUser });
});

const deleteUser = asyncWrapper(async (req, res, next) => {
  const { id: _id } = req.params;
  const foundUser = await User.findByIdAndDelete(_id);
  if (!foundUser) return res.status(404).json({ msg: `No user found by this id ${_id}` });
  res.status(200).json(foundUser);
});

module.exports = {
  getAllUsers,
  createUser,
  getCurrentUser,
  updateUser,
  deleteUser
};
