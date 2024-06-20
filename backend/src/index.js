const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logger");
// cors
// add logger

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(corsOptions));
app.use(logger);
app.use((req, res, next) => {
  throw new Error("wowowo");
  res.send("<h1>Welcome my page</h1>");
});
app.use(require("./middleware/errorHandler"));
app.listen(PORT, () => {
  console.log("server listening");
});
