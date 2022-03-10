const express = require("express");
const { authMiddleWare } = require("../auth/auth");
const router = express.Router();
const { createUser, getAllUsers, getCurrentUser, updateUser, deleteUser } = require("../controllers/users");

router.route("/").get(getAllUsers).post(createUser);
router.route("/getCurrent").get(authMiddleWare, getCurrentUser);
router.route("/:id").patch(updateUser).delete(deleteUser);

module.exports = router;
