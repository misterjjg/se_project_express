const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/constants");
const { ERROR_401 } = require("../utils/errors");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(ERROR_401).send({ message: "Authorization required" });
  }

  const token = authorization.replace("Bearer ", "");

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error(err);
    return res.status(ERROR_401).send({ message: "Forbidden Access" });
  }

  req.user = payload;
  return next();
};
