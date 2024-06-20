const { logEvents } = require("./logger");

const errorHandler = (err, req, res, next) => {
  logEvents(
    `${err.name}:${err.message} \t ${req.method} \t ${req.url} \t ${req.headers.origin}`,
    "logErr.log"
  );
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    message: err.message,
  });
};

module.exports = errorHandler;
