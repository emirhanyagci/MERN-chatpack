const { format } = require("date-fns");
const { v4: UUID } = require("uuid");
const path = require("path");
const fs = require("fs");
const fsPromise = require("fs/promises");

const logEvents = async (message, logFileName) => {
  const logDate = format(new Date(), "MM/dd/yyyy\t H:m");
  const logItem = `${logDate} \t ${UUID()} \t ${message} \n`;
  const logDir = path.join(require.main.path, "logs");
  try {
    let myPromise;
    if (!fs.existsSync(logDir)) {
      await fsPromise.mkdir(logDir);
    }
    await fsPromise.appendFile(path.join(logDir, logFileName), logItem);
  } catch (err) {
    console.log(err);
  }
};

const logger = (req, res, next) => {
  logEvents(
    `${req.method} \t ${req.url} \t ${req.headers.origin}`,
    "reqLog.log"
  );
  console.log(`${req.method} \t ${req.url} \t ${req.headers.origin}`);
  next();
};
module.exports = {
  logger,
  logEvents,
};
