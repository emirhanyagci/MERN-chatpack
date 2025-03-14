const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Chat = require("../models/Chat");

const setSignedUrl = require("../utils/setSignedUrl");
const { UnreadMessage } = require("../models/Message");
const { log } = require("node:console");

// @desc get chat details
// @route GET /chat/:chatId
// @access Private
exports.getChat = asyncHandler(async (req, res, next) => {
  const chatId = req.params.chatId;
  const userId = req.user.userId;

  const chat = await Chat.findById(chatId)
    .populate({ path: "members", select: "-password" })
    .exec();
  if (!chat) {
    return res.status(404).json({ message: "Chat not found" });
  }
  const memberIds = chat.members.map((member) => member._id.toString());
  if (memberIds.indexOf(userId) === -1) {
    return res
      .status(401)
      .json({ message: "You are not a member of this chat" });
  }

  if (chat.isGroupChat && chat.groupImage) {
    chat.groupImage = await setSignedUrl(chat.groupImage);
  }
  for (let member of chat.members) {
    member.avatar = await setSignedUrl(member.avatar);
  }

  return res.json({ chat });
});
// @desc create new private chat
// @route POST /chat/create-chat
// @access Private
exports.createNewChat = asyncHandler(async (req, res, next) => {
  const participantId = req.body.userId;
  const creatorId = req.user.userId;
  const participantUser = await User.findById(participantId);
  if (!participantUser) {
    return res.status(404).json({
      message: "Participant not found",
    });
  }
  const members = [creatorId, participantId];
  const duplicateChat = await Chat.findOne({
    members: { $all: members, $size: 2 },
    isGroupChat: false,
  });
  console.log(duplicateChat);
  if (duplicateChat) {
    return res
      .status(200)
      .json({ message: "Chat already exists", chatId: duplicateChat._id });
  }
  const chat = await Chat.create({ isGroupChat: false, members });
  if (!chat) {
    return res.status(400).json({ message: "Invalid chat data received" });
  } else {
    res.status(201).json({
      message: "Chat successfully created",
      chatId: chat._id,
    });
  }
});
// @desc create new group
// @route POST /chat/create-group
// @access Private
exports.createNewGroup = asyncHandler(async (req, res, next) => {
  const ownerId = req.user.userId;
  const { userIds, groupName } = req.body;
  const users = await User.find({
    _id: { $in: userIds },
    canBeAddedToGroups: true,
  });
  if (users.length !== userIds.length) {
    return res.status(404).json({ message: "One or more users not found" });
  }
  const members = [ownerId, ...userIds];
  const group = await Chat.create({
    isGroupChat: true,
    members,
    owner: ownerId,
    groupName,
    groupDescription: "Type your description here",
  });
  if (!group) {
    res.status(404).json({
      message: "Invalid data received",
    });
  } else {
    res.status(201).json({
      message: "Group successfully created",
      chatId: group._id,
    });
  }
});
// @desc get chat history of user
// @route GET /chat/history
// @access Private
exports.getChatHistory = asyncHandler(async (req, res, next) => {
  const userId = req.user.userId;

  const chats = await Chat.find({ members: userId })
    .populate({ path: "members lastMessage", select: "-password" })
    .lean()
    .exec();

  if (!chats.length) {
    return res.status(204).json({ chats, message: "No chats found" });
  }

  for (let chat of chats) {
    if (chat.isGroupChat && !chat.groupImage) continue;
    if (chat.groupImage) {
      chat.groupImage = await setSignedUrl(chat.groupImage);
    } else {
      let participantIndex;
      const participant = chat.members.find((member, index) => {
        if (member._id.toString() !== userId) {
          participantIndex = index;
          return member;
        }
      });

      chat.members[participantIndex].avatar = await setSignedUrl(
        participant.avatar
      );
    }

  }
  for (let chat of chats) {
    const unreadMessages = await UnreadMessage.find({
      chat: chat._id,
      member: userId,
    }).exec();

    chat.unreadMessages = unreadMessages;
  }
  return res.json({ chats });
});
// @desc set as readed messages
// @route PATCH /chat/:chatId/read
// @access Private
exports.setAsRead = asyncHandler(async (req, res, next) => {
  const userId = req.user.userId;
  const chatId = req.params.chatId;

  const unreadMessages = await UnreadMessage.find({
    chat: chatId,
    member: userId,
  }).exec();
  if (!unreadMessages.length) {
    return res.status(200).json({ message: "No unread messages found" });
  }
  const deletedUnreadMessages = await UnreadMessage.deleteMany({
    chat: chatId,
    member: userId,
  }).exec();
  return res.json({
    message: "Successfully marked as read",
    readedCount: deletedUnreadMessages.deletedCount,
  });
});
// @desc get unread messages for specific chat
// @route GET /chat/:chatId/read
// @access Private
exports.getUnreadMessages = asyncHandler(async (req, res, next) => {
  const chatId = req.params.chatId;
  const messageId = req.query.messageId;
  const userId = req.user.userId;
  const unreadMessages = await UnreadMessage.find({
    chat: chatId,
    message: messageId,
  }).exec();
  const chat = await Chat.findById(chatId).exec();

  if (!chat.members.includes(userId)) {
    return res
      .status(403)
      .json({ message: "You are not a member of this chat" });
  }
  return res.json({
    message: "Successfully",
    messages: unreadMessages,
  });
});
