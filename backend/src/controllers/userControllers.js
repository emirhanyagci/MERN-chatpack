const asyncHandler = require("express-async-handler");
const User = require("../models/User");
// @desc Search user
// @route GET /user/search
// @access Private
exports.searchUser = asyncHandler(async (req, res, next) => {
  const { search } = req.body;
  const rootUserId = req.user.userId;
  const query = new RegExp(search, "i", "g");

  const users = await User.find({
    $or: [{ username: query }, { email: query }],
    _id: { $ne: rootUserId },
  }).select("-password");

  if (!users.length) {
    return res.status(204).json({ message: "User not found" });
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
exports.updateUser = asyncHandler((req, res, next) => {});
