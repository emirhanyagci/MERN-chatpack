const { Server } = require("socket.io");
const decodeJWT = require("../utils/decodeJWT");
const http = require("http");
const express = require("express");
const app = express();
const { getChatHistory } = require("../services/chatServices");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: require("../config/allowedOrigins"),
  },
});
io.on("connection", async (socket) => {
  if (!socket.handshake.auth.token.userId) {
    return socket.disconnect();
  }
  const userId = decodeJWT(socket.handshake.auth.token).userId;
  const chatIds = await getChatHistory(userId);
  chatIds.forEach((chatId) => {
    socket.join(chatId._id.toString());
  });
  socket.on("new-message", ({ chatId }) => {
    socket.broadcast.to(chatId).emit("send-message");
  });
});
module.exports = { app, server, io };
