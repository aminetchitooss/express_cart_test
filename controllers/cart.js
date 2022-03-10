const asyncWrapper = require("../middleware/async-wrapper");
const { Cart } = require("../models/Cart");

const addProductToUserCart = asyncWrapper(async (req, res, next) => {
  const { iduser } = req; // from the auth middle ware
  const { idproduct, quantity } = req.body;

  const updatedCart = await Cart.findOneAndUpdate({ iduser, idproduct }, { quantity }, { new: true, runValidators: true });

  if (!updatedCart) {
    var cartCreated = await Cart.create({ iduser, idproduct, quantity });
    return res.status(201).json(cartCreated);
  }

  return res.send("product has been updated");
});

const removeProductFromUserCart = asyncWrapper(async (req, res, next) => {
  const { iduser } = req; // from the auth middle ware
  const { id: idproduct } = req.params;

  const foundUser = await Cart.findOneAndDelete({ iduser, idproduct });
  if (!foundUser) return res.status(404).json({ msg: `No user found by this idproduct ${idproduct} and iduser ${iduser}` });
  return res.status(200).send("product deleted from cart");
});

module.exports = {
  addProductToUserCart,
  removeProductFromUserCart
};
