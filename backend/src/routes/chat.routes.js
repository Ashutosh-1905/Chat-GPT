const express = require("express");
const { createChat, getUserChats } = require("../controllers/chat.controller");
const { createChatValidation } = require("../middlewares/validator.middleware");
const authUser  = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/",authUser , createChatValidation, createChat);
router.get("/",authUser , getUserChats);

module.exports = router;