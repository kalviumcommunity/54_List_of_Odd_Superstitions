const Joi = require("joi");

const validationSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  description: Joi.string().min(5).max(2000).required(),
},);

module.exports = validationSchema;
