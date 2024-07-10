const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// @desc login
// @route POST /auth/login
// @access Public
exports.login = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({ message: "User not found" });
  }
  const matchPw = await bcrypt.compare(password, user.password);
  if (!matchPw) {
    res.status(401).json({ message: "Invalid password" });
  }
  const accessToken = jwt.sign(
    {
      userId: user._id,
      username: user.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30m" }
  );
  const refreshToken = jwt.sign(
    {
      userId: user._id,
      username: user.username,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return res.json({
    accessToken,
    message: "Successfully logged in",
  });
});

// @desc signup
// @route POST /auth/signup
// @access Public

exports.signup = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  console.log(username, 11);
  const duplicateUser = await User.findOne({ email }).exec();
  if (duplicateUser) {
    return res.status(409).json({
      message: "User already exist with received data",
    });
  }
  const hashedPw = await bcrypt.hash(password, 12);
  const user = await User.create({ username, email, password: hashedPw });
  if (!user) {
    return res.status(400).json({
      message: "Invalid user data received",
    });
  } else {
    return res.status(201).json({
      message: "User successfully created",
    });
  }
});

// @desc refresh login
// @route POST /auth/refresh
// @access Public

exports.refresh = asyncHandler(async (req, res, next) => {
  const cookie = req.cookies;

  if (!cookie?.jwt) return res.status(401).json({ message: "Unauthorized" });
  const refreshToken = cookie.jwt;
  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const accessToken = jwt.sign(
    {
      userId: decoded.userId,
      username: decoded.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30m" }
  );
  return res.json({
    accessToken,
    message: "Access token successfully refreshed",
  });
});

// @desc  clearing cookie
// @route POST /auth/logout
// @access Public
exports.logout = asyncHandler((req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie cleared" });
});
