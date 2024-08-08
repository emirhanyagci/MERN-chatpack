const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Chat = require("../models/Chat");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("../aws/client");
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
  console.log(members);
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
    if (!chat.isGroupChat || !chat.groupImage) break;
    const getObjectParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: chat.groupImage,
    };
    const command = new GetObjectCommand(getObjectParams);
    const imageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
    chat.groupImage = imageUrl;
  }
  console.log(chats);

  return res.json({ chats });
});
