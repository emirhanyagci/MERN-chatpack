const express = require("express");
const http = require("http");

const { logger } = require("./middleware/logger");
// cors
// add logger

const app = express();
const PORT = process.env.PORT || 3000;
app.use(logger);
app.use((req, res, next) => {
  console.log("yo");
  res.send("<h1>Welcome my page</h1>");
});
app.listen(PORT, () => {
  console.log("server listening");
});
