const express = require("express");
const router = express.Router();
const {
  login,
  signup,
  refresh,
  logout,
} = require("../controllers/authControllers");
router.post("/login", login);
router.post("/signup", signup);
router.post("/refresh", refresh);
router.post("/logout", logout);

module.exports = router;
