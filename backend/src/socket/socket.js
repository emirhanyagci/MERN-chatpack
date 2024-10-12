const { Server } = require("socket.io");
const decodeJWT = require("../utils/decodeJWT");
const http = require("http");
const express = require("express");
const app = express();
const { getChatHistory } = require("../services/chatServices");
const server = http.createServer(app);
const io = new Server(server);
io.on("connection", async (socket) => {
  if (!socket.handshake.auth.token) {
    return socket.disconnect();
  }
  const user = decodeJWT(socket.handshake.auth.token);
  if (!user) {
    return socket.disconnect();
  }
  const userId = user.userId;
  const chats = await getChatHistory(userId);
  socket.join(userId.toString());
  chats.forEach((chat) => {
    socket.join(chat._id.toString());
  });
  socket.on("new-message", ({ chatId }) => {
    console.log("->>", chatId);
    socket.broadcast.to(chatId).emit("send-message");
  });
  socket.on("new-chat", ({ userId, chatId }) => {
    console.log("->>", userId);
    socket.to(userId).emit("create-chat", { chatId });
  });
  socket.on("new-group", ({ selectedUsers, chatId }) => {
    selectedUsers.forEach((user) => {
      socket.to(user._id).emit("create-group", { chatId });
    });
  });
  socket.on("join-room", (room) => {
    socket.join(room);
  });
});
module.exports = { app, server, io };
