const ClothingItem = require("../models/clothingItem");
const ForbiddenError = require("../utils/errors/forbidden-error");
const BadRequestError = require("../utils/errors/bad-request-error");
const DocumentNotFoundError = require("../utils/errors/not-found-error");

const createItem = (req, res, next) => {
  const { name, weather, imageUrl, likes } = req.body;
  const userId = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner: userId, likes })
    .then((item) => {
      res.status(200).send({ item });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => {
      res.status(200).send(items);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
};

const likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((item) => {
      res.status(200).send({ item });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        next(
          new DocumentNotFoundError(
            "There is no clothing item with the requested id, or the request was sent to a non-existent address",
          ),
        );
      } else if (err.name === "CastError") {
        next(new BadRequestError("Invalid ID passed."));
      } else {
        next(err);
      }
    });
};

const dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((item) => {
      res.status(200).send({ item });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        next(
          new DocumentNotFoundError(
            "There is no clothing item with the requested id, or the request was sent to a non-existent address",
          ),
        );
      } else if (err.name === "CastError") {
        next(new BadRequestError("Invalid ID passed."));
      } else {
        next(err);
      }
    });
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (String(item.owner) !== req.user._id) {
        throw new ForbiddenError("You are not authorized to delete this item.");
      }
      return item
        .deleteOne()
        .then(() => res.send({ message: "Item deleted." }));
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid ID passed"));
      } else if (err.name === "DocumentNotFoundError") {
        next(
          new DocumentNotFoundError(
            "There is no clothing item with the requested id, or the request was sent to a non-existent address",
          ),
        );
      } else {
        next(err);
      }
    });
};

module.exports = { createItem, getItems, likeItem, dislikeItem, deleteItem };
