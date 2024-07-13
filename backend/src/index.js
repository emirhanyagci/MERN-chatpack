const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { logger } = require("./middleware/logger");
const mongoose = require("mongoose");

// cors
// add logger

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors(corsOptions));
app.use(logger);
app.use("/auth", require("./routes/authRoutes"));
app.use("/user", require("./routes/userRoutes"));
app.use((req, res, next) => {
  res.send("<h1>Welcome my page</h1>");
});
app.use(require("./middleware/errorHandler"));

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log("server listening", PORT);
  });
});
