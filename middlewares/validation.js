const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

// - - - URL Validator Function - - -
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

// - - - Create Item - - -
const validateClothingItem = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled',
    }),
    weather: Joi.string().valid("hot", "warm", "cold").required(),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.uri": 'The "imageUrl" field must be a valid url',
      "string.empty": 'The "imageUrl" field must be filled in',
    }),
  }),
});

// - - - Create User - - -
const validateNewUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.uri": 'The "avatar" field must be a valid url',
      "string.empty": 'The "avatar" field must be filled in',
    }),
    email: Joi.string().required().email().messages({
      "string.uri": 'The "email" field must be a valid email',
      "string.empty": 'The "email" field must be filled in',
    }),
    password: Joi.string().required().min(8).messages({
      "string.min": 'The minimum length of the "password" field is 8',
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

// - - - Login User - - -
const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.uri": 'The "email" field must be a valid email',
      "string.empty": 'The "email" field must be filled in',
    }),
    password: Joi.string().required().min(8).messages({
      "string.min": 'The minimum length of the "password" field is 8',
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

// - - - Delete Item - - -
const validateDeleteItem = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24), // check hexadecimal setup correctly
  }),
});

// - - - Dislike Item - - -
const validateDislikeItem = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24), // check hexadecimal setup correctly
  }),
});

// - - -  Like Item - - -
const validateLikeItem = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24), // check hexadecimal setup correctly
  }),
});

// - - -  Get Current User - - -
const validateGetCurrentUser = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24), // check hexadecimal setup correctly
  }),
});

// - - -  Update User - - -
const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.uri": 'The "avatar" field must be a valid url',
      "string.empty": 'The "avatar" field must be filled in',
    }),
  }),
});

module.exports = {
  validateClothingItem,
  validateDeleteItem,
  validateDislikeItem,
  validateLikeItem,
  validateLogin,
  validateNewUser,
  validateUpdateUser,
  validateGetCurrentUser,
};
