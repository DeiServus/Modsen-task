const Joi = require('joi');

const getMeetupsSchema = Joi.object({
    searchTerm: Joi.string().empty(''),
    sort: Joi.string().valid('asc', 'desc').default('asc'),
    page: Joi.number().integer().min(1).default(1),
    pageSize: Joi.number().integer().min(1).default(3)
});

module.exports = {
    getMeetupsSchema
};