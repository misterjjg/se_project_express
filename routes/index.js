const router = require("express").Router();
const user = require("./user");
const clothingItem = require("./clothingItem");
// const { ERROR_404 } = require("../utils/errors");
const { loginUser, createUser } = require("../controllers/user");
const { validateNewUser, validateLogin } = require("../middlewares/validation");
const NotFoundError = require("../utils/errors/not-found-error");

router.post("/signin/", validateLogin, loginUser);
router.post("/signup/", validateNewUser, createUser);

router.use("/items", clothingItem);
router.use("/users", user);

// router.use((req, res) => {
//   res.status(ERROR_404).send({ message: "Requested resource not found" });
// });

router.use((req, res) => {
  console.log(res);
  return next(
    new NotFoundError("The request was sent to a non-existent address"),
  );
});

module.exports = router;
