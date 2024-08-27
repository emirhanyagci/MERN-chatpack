const express = require("express");
const {
  sendMessage,
  getMessages,
} = require("../controllers/messageController");
const verifyJWT = require("../middleware/verifyJWT");

const router = express.Router();
router.use(verifyJWT);
router.get(":chatId/messages", getMessages);
router.post(":chatId/messages", sendMessage);

module.exports = router;
