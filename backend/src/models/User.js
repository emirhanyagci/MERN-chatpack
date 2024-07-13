const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "Free",
  },
  canBeAddedToGroups: {
    type: Boolean,
    default: true,
  },
  reportCount: {
    type: Number,
    default: 0,
  },
  blockList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
