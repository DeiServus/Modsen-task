const ApiError = require("../exceptions/api-error");

module.exports = function (req, res, next) {
    try {
        if(!req.user.role){
            return next(ApiError.NotOrganizerError());
        }
        
        next();
    } catch(e) {
        return next(ApiError.NotOrganizerError());
    }
}