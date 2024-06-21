const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("Chat", chatSchema);
