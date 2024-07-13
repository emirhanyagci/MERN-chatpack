const express = require("express");
const router = express.Router();
const { searchUser, getUserById } = require("../controllers/userControllers");
const verifyJWT = require("../middleware/verifyJWT");
router.use(verifyJWT);
router.get("/search", searchUser);
router.get("/details", getUserById);

module.exports = router;
