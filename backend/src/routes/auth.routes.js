const express = require("express");
const { createUser, loginUser, logoutUser } = require("../controllers/auth.controller");
const { registerUserValidation, loginUserValidation } = require("../middlewares/validator.middleware");

const router = express.Router();


router.post("/register",  registerUserValidation ,createUser);
router.post("/login",  loginUserValidation , loginUser);
router.post("/logout",  logoutUser);

module.exports = router;