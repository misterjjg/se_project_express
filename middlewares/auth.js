const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/constants");
// const { ERROR_401 } = require("../utils/errors");
const UnauthorizedError = require("../utils/errors/unauthorized-error");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(
      new UnauthorizedError("Invalid format for authorization header"),
    );
  }

  const token = authorization.replace("Bearer ", "");

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error(err);
    return next(
      new UnauthorizedError("An error occurred while parsing the payload"),
    );
  }

  req.user = payload;
  return next();
};
