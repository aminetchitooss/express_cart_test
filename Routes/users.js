const express = require("express");
const User = require("../Models/User");
const router = express.Router();

router.get("/", async (req, res) => {
  const results = await User.findAll();
  res.send(results);
});

router.post("/addUser", async (req, res) => {
  const vUser = await User.create(req.body);
  res.send(vUser);
});

router.put("/updateProfile/", authMiddleWare, async (req, res) => {
  let vUser = await User.findOne({ where: { id: req.userId } });
  if (!vUser) res.status(404).send("Not Found, You must create User");
  else {
    vUser.username = req.body.username;
    await vUser.save();
    res.send(vUser);
  }
});

router.put("/addProduct/", authMiddleWare, async (req, res) => {
  let vUser = await User.findOne({ where: { id: req.userId } });
  if (!vUser) res.status(404).send("Not Found, You must create User");
  else {
    vUser.orders = req.body.orders;
    await vUser.save();
    res.send(vUser);
  }
});

router.delete("/deleteProduct/:id", authMiddleWare, async (req, res) => {
  const productId = req.params.id;
  let vUser = await User.findOne({ where: { id: req.userId } });
  if (!vUser) res.status(404).send("Not Found, You must create User");
  else {
    vUser.orders = vUser.orders.filter((o) => o.product.id !== productId);
    await vUser.save();
    res.send(vUser);
  }
});

router.put("/updateQuantity/:id", authMiddleWare, async (req, res) => {
  const productId = req.params.id;
  const newQuantity = req.params.quantity;

  let vUser = await User.findOne({ where: { id: req.userId } });
  if (!vUser) res.status(404).send("Not Found, You must create User");
  else {
    for (const order of vUser.orders) {
      if (order.product.id == productId) order.quantity = newQuantity;
    }
    await vUser.save();
    res.send(vUser);
  }
});

function authMiddleWare(req, res, next) {
  // here validating the token
  if (
    !req.headers.authorization ||
    req.headers.authorization.indexOf("user_") == -1
  ) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  req.userId = getUserIdFromToken(req.headers.authorization);
  next();
}

function getUserIdFromToken(pAuth) {
  return pAuth.split("user_")[1];
}

module.exports = router;
