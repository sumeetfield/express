const express = require("express");
const router = express.Router();
const {createUser,loginUser,matchUser} = require("../controllers/user")

router.route("/signup").post(createUser);
router.route("/login").post(loginUser);
router.route("/match").post(matchUser);


module.exports =router;