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
    unreadMessagesCount: [
      {
        type: Object,
        default: [],
      },
    ],
    lastMessage: {
      type: String,
      default: "Start chat!",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: function () {
        return this.isGroupChat;
      },
    },
    managers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

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
    groupImage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Chat", chatSchema);
