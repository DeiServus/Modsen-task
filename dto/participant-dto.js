const Joi = require('joi');

module.exports = Joi.object({
    userId: Joi.number().integer().min(1),
    meetupId: Joi.number().integer().min(1)
});