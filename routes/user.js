const express = require("express");
const router = express.Router();
const {createUser,loginUser} = require("../controllers/user")

router.route("/signup").post(createUser);
router.route("/login").post(loginUser);


module.exports =router;