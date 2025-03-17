const asyncHandler = require("express-async-handler");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("../aws/client");
const User = require("../models/User");
const setSignedUrl = require("../utils/setSignedUrl");
// @desc get logged in user
// @route GET /user/current
// @access Private
exports.getCurrentUser = asyncHandler(async (req, res, next) => {
  //SIGNED
  const { userId } = req.user;
  const user = await User.findById(userId).select("-password -reportCount");
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  user.avatar = await setSignedUrl(user.avatar);
  return res.json(user);
});
// @desc Search user
// @route GET /user/search
// @access Private
exports.searchUser = asyncHandler(async (req, res, next) => {
  const search = req.query.search;
  const rootUserId = req.user.userId;
  const query = new RegExp(search, "i", "g");
  const users = await User.find({
    $or: [{ username: query }, { email: query }],
    _id: { $ne: rootUserId },
  })
    .limit(20)
    .select("-password");

  if (!users.length) {
    return res.status(204).json({ message: "User not found" });
  }

  for (let user of users) {
    const getObjectParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: user.avatar,
    };
    const command = new GetObjectCommand(getObjectParams);
    const avatarUrl = await getSignedUrl(s3, command, { expiresIn: 1200 });
    user.avatar = avatarUrl;
  }

  return res.json({
    message: "Successfully",
    users,
  });
});
// @desc get user details
// @route GET /user/details
// @access Private
exports.getUserById = asyncHandler(async (req, res, next) => {
  const { userId } = req.body;
  const user = await User.findById(userId).select("-password");
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  return res.json({ message: "Successfully", user });
});

// @desc Update user
// @route PATCH /user/update
// @access Private
exports.updateUser = asyncHandler((req, res, next) => { });

// @desc Block user
// @route POST /user/block
// @access Private
exports.blockUser = asyncHandler(async (req, res, next) => {
  const blockerId = req.user.userId
  const { userId } = req.body

  const blockerUser = await User.findById(blockerId).populate("blockList").exec();
  const blockedUser = await User.findById(userId).exec();

  if (!blockedUser || !blockerUser) {
    return res.status(404).json({
      message: " User not found"
    })
  }
  finedUser = blockerUser.blockList.find((user) => String(user._id) === userId);
  if (finedUser) {
    return res.status(409).json({
      message: "User already blocked"
    })
  }
  blockerUser.blockList.push(blockedUser);
  blockerUser.save()
  return res.json({ message: "Successfully", blockerUser });

});
// @desc Block user
// @route POST /user/unblock
// @access Private
exports.unblockUser = asyncHandler(async (req, res, next) => {
  const blockerId = req.user.userId
  const { userId } = req.body

  const blockerUser = await User.findById(blockerId).populate("blockList").exec();

  newBlockList = blockerUser.blockList.filter((user) => String(user._id) !== userId);

  blockerUser.blockList = newBlockList;
  blockerUser.save()
  return res.json({ message: "Successfully unblocked" });

});
