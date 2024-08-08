const express = require("express");
const router = express.Router();
const {
  login,
  signup,
  refresh,
  logout,
} = require("../controllers/authControllers");
const upload = require("../middleware/multerUpload");
router.post("/login", login);
router.post("/signup", upload.single("avatar"), signup);
router.post("/refresh", refresh);
router.post("/logout", logout);

module.exports = router;
