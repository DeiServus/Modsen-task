const userService = require('../services/auth-service');

class UserController {
    async registration(req, res){
        const {password, login, roleId} = req.body;
        const userData = await userService.registration(login, password, roleId);
        setRefreshTokenCookie(res, userData.refreshToken);
        return res.status(200).json(userData);
    }

    async login(req, res){
        const {login, password} = req.body;
        const userData = await userService.login(login, password);
        setRefreshTokenCookie(res, userData.refreshToken);
        return res.status(200).json(userData);
    }

    async logout(req, res){
        const {refreshToken} = req.cookies;
        const token = await userService.logout(refreshToken);
        res.clearCookie('refreshToken');
        return res.status(200).json(token);
    }    

    async refresh(req, res){
        const {refreshToken} = req.cookies;
        const userData = await userService.refresh(refreshToken);
        setRefreshTokenCookie(res, userData.refreshToken);
        return res.status(200).json(userData);
    }
}

const setRefreshTokenCookie = function(res, refreshToken) {
    res.cookie('refreshToken', refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
}

module.exports = new UserController();