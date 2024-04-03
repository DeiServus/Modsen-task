module.exports = function (req, res, next) {
    try {
        if(!req.user.role){
            return next(Error("Нет прав"));
        }

        next();
    } catch(e) {
        return next(Error("Нет прав"));
    }
}