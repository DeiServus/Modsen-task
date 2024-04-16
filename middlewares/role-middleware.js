const ApiError = require("../exceptions/api-error");

module.exports = function (req, res, next) {
    try {
        if(req.user.roleId!=2){
            return next(ApiError.NotOrganizerError());
        }
        
        next();
    } catch(e) {
        return next(ApiError.NotOrganizerError());
    }
}