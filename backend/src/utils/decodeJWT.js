const jwt = require("jsonwebtoken");
const decodeJWT = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    return decoded;
  } catch (error) {
    return null;
  }
};

module.exports = decodeJWT;
