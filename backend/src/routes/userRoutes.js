const express = require("express");
const router = express.Router();
const {
  searchUser,
  getUserById,
  getCurrentUser,
  blockUser,
  unblockUser
} = require("../controllers/userControllers");
const verifyJWT = require("../middleware/verifyJWT");
router.use(verifyJWT);
router.get("/current", getCurrentUser);
router.get("/search", searchUser);
router.get("/details", getUserById);
router.post("/block", blockUser);
router.post("/unblock", unblockUser);

module.exports = router;
