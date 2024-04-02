const tokenService = require("../services/token-service");

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader){
            return next(Error("Проблемы авторизаци 1"));
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if(!accessToken){
            return next(Error("Проблемы авторизаци 2"));
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if(!userData){
            return next(Error("Проблемы авторизаци 3"));
        }

        req.user = userData;
        next();
    } catch(e) {
        return next(Error("Проблемы авторизаци"));
    }
}