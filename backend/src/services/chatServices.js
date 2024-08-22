const asyncHandler = require("express-async-handler");
const Chat = require("../models/Chat");

exports.getChatHistory = asyncHandler(async (userId) => {
  const chats = await Chat.find({ members: userId }).select("_id").exec();
  return chats;
});
