const express = require("express");
const {
  createNewChat,
  createNewGroup,
  getChatHistory,
  getChat,
  setAsRead,
  getUnreadMessagesByChatId,
  getUnreadMessagesByUserId
} = require("../controllers/chatControllers");
const verifyJWT = require("../middleware/verifyJWT");
const router = express.Router();
router.use(verifyJWT);
router.post("/create-chat", createNewChat);
router.post("/create-group", createNewGroup);
router.get("/:chatId/read", getUnreadMessagesByChatId);
router.get("/read", getUnreadMessagesByUserId);
router.patch("/:chatId/read", setAsRead);
router.get("/history", getChatHistory);
router.get("/:chatId", getChat);

module.exports = router;
