const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
// const handleError = require("../utils/config");

const { JWT_SECRET } = require("../utils/constants");
// const { ERROR_400, ERROR_404, ERROR_401 } = require("../utils/errors");

const BadRequestError = require("../utils/errors/bad-request-error");
const DuplicateError = require("../utils/errors/duplicate-error");
const UnauthorizedError = require("../utils/errors/unauthorized-error");
const NotFoundError = require("../utils/errors/not-found-error");

const createUser = (req, res, next) => {
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
        if (err.name === "ValidationError") {
          next(new BadRequestError(err.message));
        } else if (err.code === 11000) {
          next(new DuplicateError("Email already exists in our system."));
        } else {
          next(err);
        }
      }),
  );
};

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        next(
          new NotFoundError(
            "There is no user with the requested id, or the request was sent to a non-existent address",
          ),
        );
      } else if (err.name === "CastError") {
        next(new BadRequestError("Invalid ID passed."));
      } else {
        next(err);
      }
    });
};

const updateCurrentUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, avatar: req.body.avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        next(
          new NotFoundError(
            "There is no user with the requested id, or the request was sent to a non-existent address",
          ),
        );
      } else if (err.name === "CastError") {
        next(new BadRequestError("Invalid ID passed."));
      } else if (err.name === "ValidationError") {
        next(new BadRequestError("You must enter a valid URL."));
      } else {
        next(err);
      }
    });
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;

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
        next(new UnauthorizedError("Incorrect email address or password."));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  getCurrentUser,
  loginUser,
  updateCurrentUser,
};
