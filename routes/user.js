const router = require("express").Router();
const auth = require("../middlewares/auth");

const { updateCurrentUser, getCurrentUser } = require("../controllers/user");

const { validateUpdateUser } = require("../middlewares/validation");

// Create

// Read
router.get("/me", auth, getCurrentUser);

// Update
router.patch("/me", auth, validateUpdateUser, updateCurrentUser);

module.exports = router;
