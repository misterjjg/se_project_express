const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  createItem,
  getItems,
  likeItem,
  dislikeItem,
  deleteItem,
} = require("../controllers/clothingItem");

// Read
router.get("/", getItems);

router.use(auth);

// Create
router.post("/", createItem);

// Update
router.put("/:itemId/likes", likeItem);

// Delete
router.delete("/:itemId", deleteItem);
router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
