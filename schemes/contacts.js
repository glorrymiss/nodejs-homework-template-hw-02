const Joi = require("joi");

const validSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean,
});

const validFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
module.exports = { validSchema, validFavoriteSchema };
