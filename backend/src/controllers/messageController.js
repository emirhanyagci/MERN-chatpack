const asyncHandler = require("express-async-handler");
const Chat = require("../models/Chat");
const { Message, UnreadMessage } = require("../models/Message");
const setSignedUrl = require("../utils/setSignedUrl");

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
    .populate({ path: "sender", clone: true })
    .select("-password")
    .exec();
  if (!messages) {
    return res.status(404).json({ message: "No messages found" });
  }

  for (let message of messages) {
    message.sender.avatar = await setSignedUrl(message.sender.avatar);
  }

  //is member of this chat
  return res.json({ messages: messages, message: "succesfully", chatId });
});
// @desc get message of specific chat
// @route POST /chat/:chatId/messages
// @access Private
exports.sendMessage = asyncHandler(async (req, res) => {
  const chatId = req.params.chatId;
  const { message } = req.body;
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
  chat.lastMessage = messageDoc._id;
  await chat.save();

  chat.members.forEach(async (member) => {
    if (member.toString() !== req.user.userId) {

      const unreadMessage = new UnreadMessage({
        chat: chat._id,
        member: member._id,
        message: messageDoc._id,
      });
      await unreadMessage.save();
    }
  });
  await messageDoc.save();
  return res.json({ message: "succesfully sended", chatId: chat._id });
});
