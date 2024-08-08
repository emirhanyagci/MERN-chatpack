const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    avatar: {
      required: true,
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
  },
  { versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
