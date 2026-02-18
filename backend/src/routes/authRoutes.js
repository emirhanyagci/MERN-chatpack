const express = require("express");
const router = express.Router();
const {
  login,
  signup,
  refresh,
  logout,
} = require("../controllers/authControllers");
const upload = require("../middleware/multerUpload");
const {
  authSignupLimiter,
  authLoginLimiter,
} = require("../middleware/rateLimiters");
router.post("/login", authLoginLimiter, login);
router.post("/signup", authSignupLimiter, upload.single("avatar"), signup);
router.post("/refresh", refresh);
router.post("/logout", logout);

module.exports = router;
