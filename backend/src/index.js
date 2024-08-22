const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { logger } = require("./middleware/logger");
const http = require("http");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const { app, server } = require("./socket/socket");
app.use(express.static("public"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors(corsOptions));
app.use(logger);
app.use("/auth", require("./routes/authRoutes"));
app.use("/user", require("./routes/userRoutes"));
app.use(require("./routes/messageRoutes"));
app.use("/chat", require("./routes/chatRoutes"));
app.use(require("./middleware/errorHandler"));
app.use((req, res, next) => {
  res.send("<h1>Welcome my page</h1>");
});

mongoose.connect(process.env.MONGO_URI).then(() => {
  server.listen(PORT, () => {
    console.log("listening on *:3000");
  });
});
