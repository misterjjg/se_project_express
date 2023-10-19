const {BAD_REQUEST, NOT_FOUND, SERVER_ERROR} = require("./errors");

const handleError = (req, res, error) => {
  console.error(error);
  switch (error.name) {
    case "ValidationError":
      res.status(BAD_REQUEST).send({ message: "Validation failed" });
      break;
    case "CastError":
      res.status(BAD_REQUEST).send({ message: "Could not cast parameters" });
      break;
    case "DocumentNotFoundError":
      res.status(NOT_FOUND).send({ message: "Resource not found" });
      break;
    default:
      res.status(SERVER_ERROR).send({ message: "Server encountered an error" });
  }
};

module.exports = handleError;