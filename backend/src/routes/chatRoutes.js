const express = require("express");
const {
  createNewChat,
  createNewGroup,
  getChatHistory,
} = require("../controllers/chatControllers");
const verifyJWT = require("../middleware/verifyJWT");
const router = express.Router();
router.use(verifyJWT);
router.post("/create-chat", createNewChat);
router.post("/create-group", createNewGroup);
router.get("/history", getChatHistory);

module.exports = router;
