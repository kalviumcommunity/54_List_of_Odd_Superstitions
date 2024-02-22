const Joi = require("joi");

const validationSchema = Joi.object({
  title: Joi.string().alphanum().min(3).required(),
  description: Joi.string().alphanum().min(5).required(),
});

module.exports = validationSchema;
