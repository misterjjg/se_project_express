// const {
//   ERROR_400,
//   ERROR_401,
//   ERROR_403,
//   ERROR_404,
//   ERROR_409,
//   ERROR_500,
// } = require("./errors");

// const handleError = (req, res, err) => {
//   console.error(err);
//   if (err.code === 11000) {
//     res
//       .status(ERROR_409)
//       .send({ message: "A user with that email already exists" });
//   } else if (err.message === "Authentication Failed") {
//     res.status(ERROR_401).send({ message: "Invalid email or password" });
//   } else if (err.message === "Cannot delete another user's item") {
//     res
//       .status(ERROR_403)
//       .send({ message: "Cannot delete another user's item" });
//   } else {
//     switch (err.name) {
//       case "ValidationError":
//         res.status(ERROR_400).send({ message: "Validation failed" });
//         break;
//       case "CastError":
//         res.status(ERROR_400).send({ message: "Could not cast parameters" });
//         break;
//       case "ForbiddenError":
//         res.status(ERROR_403).send({ message: "Forbidden Action" });
//         break;
//       case "DocumentNotFoundError":
//         res.status(ERROR_404).send({ message: "Resource not found" });
//         break;

//       default:
//         res.status(ERROR_500).send({ message: "Server encountered an error" });
//     }
//   }
// };

// module.exports = handleError;
