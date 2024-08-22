const asyncHandler = require("express-async-handler");
const Chat = require("../models/Chat");
const Message = require("../models/Message");
const setSignedUrl = require("../utils/setSignedUrl");
const { io } = require("../socket/socket");

// @desc get all message of specific chat
// @route GET /chat/:chatId/messages
// @access Private
exports.getMessages = asyncHandler(async (req, res) => {
  const chatId = req.params.chatId;
  const chat = await Chat.findById(chatId);
  if (!chat) {
    return res.status(404).json({ message: "Chat not found" });
  }
  if (chat.members.indexOf(req.user.userId) === -1) {
    return res.status(403).json({ message: "Access denied" });
  }
  const messages = await Message.find({ chat: chatId })
    .sort({ createdAt: 1 })
    .populate("sender")
    .select("-password")
    .exec();
  if (!messages) {
    return res.status(404).json({ message: "No messages found" });
  }
  let clonedMessages = JSON.parse(JSON.stringify(messages));

  for (let message of clonedMessages) {
    message.sender.avatar = await setSignedUrl(message.sender.avatar);
  }

  //is member of this chat
  return res.json({ messages: clonedMessages, message: "succesfully", chatId });
});
// @desc get message of specific chat
// @route POST /chat/:chatId/messages
// @access Private
exports.sendMessage = asyncHandler(async (req, res) => {
  const chatId = req.params.chatId;
  const { message } = req.body;
  console.log(chatId);
  const chat = await Chat.findById(chatId);
  if (!chat) {
    return res.status(404).json({ message: "Chat not found" });
  }
  if (chat.members.indexOf(req.user.userId) === -1) {
    return res.status(403).json({ message: "Access denied" });
  }
  const messageDoc = new Message({
    sender: req.user.userId,
    message: message,
    chat: chatId,
  });
  await messageDoc.save();
  return res.json({ message: "succesfully sended" });
});
