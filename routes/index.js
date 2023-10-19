const router = require("express").Router();
const user = require("./user");
const clothingItem = require("./clothingItem");
const { NOT_FOUND } = require("../utils/errors");

router.use("/items", clothingItem);
router.use("/users", user);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

module.exports = router;
