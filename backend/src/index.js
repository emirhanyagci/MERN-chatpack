const express = require("express");
const cors = require("cors");
const { logger } = require("./middleware/logger");
// cors
// add logger

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(require("./config/corsOptions")));
app.use(logger);
app.use((req, res, next) => {
  console.log("yo");
  res.send("<h1>Welcome my page</h1>");
});
app.listen(PORT, () => {
  console.log("server listening");
});
