const express = require("express");
const {
  createNewChat,
  createNewGroup,
  getChatHistory,
  getChat,
} = require("../controllers/chatControllers");
const verifyJWT = require("../middleware/verifyJWT");
const router = express.Router();
router.use(verifyJWT);
router.post("/create-chat", createNewChat);
router.post("/create-group", createNewGroup);
router.get("/history", getChatHistory);
router.get("/:chatId", getChat);

module.exports = router;
