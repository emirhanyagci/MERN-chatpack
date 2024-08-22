const crypto = require("crypto");
const getRandomFileName = (fileName) => {
  return crypto.randomBytes(32).toString("hex") + "-" + fileName;
};
module.exports = getRandomFileName;
