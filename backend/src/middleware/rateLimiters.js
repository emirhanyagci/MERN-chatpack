const rateLimit = require("express-rate-limit");

function createLimiter({ windowMs, max, message }) {
  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message },
  });
}

const authSignupLimiter = createLimiter({
  windowMs: 10 * 60 * 1000,
  max: 10,
  message: "Too many signup attempts, please try again later.",
});

const authLoginLimiter = createLimiter({
  windowMs: 10 * 60 * 1000,
  max: 30,
  message: "Too many login attempts, please try again later.",
});

module.exports = {
  authSignupLimiter,
  authLoginLimiter,
};

