const tokenService = require("../services/token-service");

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader){
            return next(Error("Unauthorized user"));
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if(!accessToken){
            return next(Error("Unauthorized user"));
        }

        const userData = tokenService.validateToken(accessToken, process.env.ACCESS_SECRET);
        if(!userData){
            return next(Error("Unauthorized user"));
        }

        req.user = userData;
        next();
    } catch(e) {
        return next(Error("Unauthorized user"));
    }
}