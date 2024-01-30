const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  validateClothingItem,
  validateDeleteItem,
  validateDislikeItem,
  validateLikeItem,
} = require("../middlewares/validation");

const {
  createItem,
  getItems,
  likeItem,
  dislikeItem,
  deleteItem,
} = require("../controllers/clothingItem");

// Read
router.get("/", getItems);

// Create
router.post("/", auth, validateClothingItem, createItem);

// Update
router.put("/:itemId/likes", auth, validateLikeItem, likeItem);

// Delete
router.delete("/:itemId", auth, validateDeleteItem, deleteItem);
router.delete("/:itemId/likes", auth, validateDislikeItem, dislikeItem);

module.exports = router;
