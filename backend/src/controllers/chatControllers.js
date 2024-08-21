const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Chat = require("../models/Chat");

const setSignedUrl = require("../../utils/setSignedUrl");
const { log } = require("console");
// @desc get chat details
// @route GET /chat/:chatId
// @access Private
exports.getChat = asyncHandler(async (req, res, next) => {
  const chatId = req.params.chatId;
  const userId = req.user.userId;
  console.log();

  const chat = await Chat.findById(chatId)
    .populate({ path: "members", select: "-password" })
    .exec();
  const memberIds = chat.members.map((member) => member._id.toString());
  if (memberIds.indexOf(userId) === -1) {
    return res
      .status(401)
      .json({ message: "You are not a member of this chat" });
  }
  if (!chat) {
    return res.status(404).json({ message: "Chat not found" });
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
  const chat = await Chat.create({ isGroupChat: false, members });
  if (!chat) {
    return res.status(400).json({ message: "Invalid chat data received" });
  } else {
    res.status(201).json({
      message: "Chat successfully created",
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
    });
  }
});
// @desc get chat history of user
// @route GET /chat/history
// @access Private
exports.getChatHistory = asyncHandler(async (req, res, next) => {
  const userId = req.user.userId;

  const chats = await Chat.find({ members: userId })
    .populate({ path: "members", select: "-password" })
    .exec();
  if (!chats.length) {
    return res.status(204).json({ chats, message: "No chats found" });
  }

  for (let chat of chats) {
    if (chat.isGroupChat && !chat.groupImage) break;
    if (chat.groupImage) {
      chat.groupImage = await setSignedUrl(chat.groupImage);
    } else {
      let participantIndex;
      const participant = chat.members.find((member, index) => {
        if (member._id.toString() !== userId) {
          console.log(member);

          participantIndex = index;
          return member;
        }
      });

      chat.members[participantIndex].avatar = await setSignedUrl(
        participant.avatar
      );
    }
  }

  return res.json({ chats });
});
