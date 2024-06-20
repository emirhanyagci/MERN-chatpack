const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
  origin: function (origin, callback) {
    const isDevelopment = process.env.ENV === "development" ? true : false;
    const allowEmptyOrigin = isDevelopment && !origin ? true : false;

    if (allowedOrigins.indexOf(origin) !== -1 || allowEmptyOrigin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
