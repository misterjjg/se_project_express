const router = require("express").Router();
const auth = require("../middlewares/auth");

const { updateCurrentUser, getCurrentUser } = require("../controllers/user");

// Create

router.use(auth);

// Read
router.get("/me", getCurrentUser);

// Update
router.patch("/me", updateCurrentUser);

module.exports = router;
