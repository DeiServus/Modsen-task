const Joi = require('joi');

module.exports = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).max(500).required(),
    tags: Joi.string().min(3).max(100).required(),
    time_location: Joi.string().required(),
});