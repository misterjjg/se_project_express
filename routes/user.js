const router = require("express").Router();
const auth = require("../middlewares/auth");

const { updateCurrentUser, getCurrentUser } = require("../controllers/user");

// Create

// Read
router.get("/me", auth, getCurrentUser);

// Update
router.patch("/me", auth, updateCurrentUser);

module.exports = router;
