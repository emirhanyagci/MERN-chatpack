const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    isGroupChat: {
      type: Boolean,
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    managers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    lastMessage: {
      type: String,
    },
    groupName: {
      type: String,
      required: function () {
        return this.isGroupChat;
      },
    },
    groupDescription: {
      type: String,
      required: function () {
        return this.isGroupChat;
      },
    },
    groupImageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
