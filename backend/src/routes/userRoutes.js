const express = require("express");
const router = express.Router();
const {
  searchUser,
  getUserById,
  getCurrentUser,
} = require("../controllers/userControllers");
const verifyJWT = require("../middleware/verifyJWT");
router.use(verifyJWT);
router.get("/current", getCurrentUser);
router.get("/search", searchUser);
router.get("/details", getUserById);

module.exports = router;
