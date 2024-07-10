const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const userSchema = new mongoose.Schema({
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
userSchema.plugin(AutoIncrement, {
  inc_field: "chatPackId",
  start_seq: 100000,
});

module.exports = mongoose.model("User", userSchema);
