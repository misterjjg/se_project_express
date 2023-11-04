const User = require("../models/user");
const handleError = require("../utils/config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/constants");
const { ERROR_400, ERROR_404 } = require("../utils/errors");

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) =>
    User.create({ name, avatar, email, password: hash })
      .then((user) => {
        const userData = user.toObject();
        delete userData.password;
        res.send({ userData });
      })
      .catch((err) => {
        console.error(err);
        if (err.message === "Incorrect email or password") {
          res
            .status(ERROR_400)
            .send({ message: "Incorrect email or password" });
        } else {
          handleError(req, res, err);
        }
      }),
  );
};

const getCurrentUser = (req, res) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      console.error(err);
      handleError(req, res, err);
    });
};

const updateCurrentUser = (req, res) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => {
      if (!user) {
        return res
          .status(ERROR_404)
          .send({ message: "Requested Resource Not Found" });
      }
      return res.send({ user });
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "Incorrect email or password") {
        res.status(ERROR_400).send({ message: "Incorrect email or password" });
      } else {
        handleError(req, res, err);
      }
    });
};

const logIn = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(ERROR_400)
      .send({ message: "Email and password are required." });
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "Incorrect email or password") {
        res.status(ERROR_400).send({ message: "Incorrect email or password" });
      } else {
        handleError(req, res, err);
      }
    });
};

module.exports = {
  createUser,
  getCurrentUser,
  logIn,
  updateCurrentUser,
};
