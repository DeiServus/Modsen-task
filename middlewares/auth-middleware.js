const tokenService = require("../services/token-service");
const ApiError = require("../exceptions/api-error");

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader){
            return next(ApiError.UnauthorizedError());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if(!accessToken){
            return next(ApiError.UnauthorizedError());
        }

        const userData = tokenService.validateToken(accessToken, process.env.ACCESS_SECRET);
        if(!userData){
            return next(ApiError.UnauthorizedError());
        }

        req.user = userData;
        next();
    } catch(e) {
        return next(ApiError.UnauthorizedError());
    }
}