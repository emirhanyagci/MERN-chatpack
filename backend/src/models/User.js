const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  chatPackId: {
    type: Number,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
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
