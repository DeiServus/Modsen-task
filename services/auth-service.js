const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const tokenService = require('./token-service');
const userService = require('./user-service');
const bcrypt = require('bcrypt');
const ApiError = require("../exceptions/api-error");

class AuthService {
    async registration(login, password, roleId) {
        const user = await userService.postUser(login, password, roleId);
        const tokens = tokenService.generateTokens({login: user.login, roleId: user.roleId})
        await tokenService.saveToken(user.id, tokens.refreshToken)
        return {...tokens, user:user}
    }

    async login(login, password) {
        const user = await userService.getUserByLogin(login);
        if (!user) {
            throw ApiError.BadRequest('this user does not exist');
        }
        const isPassEquels = await bcrypt.compare(password, user.password);
        if (!isPassEquels) {
            throw ApiError.BadRequest('Something is wrong');
        }
        
        const tokens = tokenService.generateTokens({login: user.login, roleId: user.roleId});
        await tokenService.saveToken(user.id, tokens.refreshToken)
        return {...tokens, user:user}
    }

    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken){
        if(!refreshToken){
            throw ApiError.BadRequest("Unauthorized user");
        }
        const userData = tokenService.validateToken(refreshToken, process.env.REFRESH_SECRET);
        const tokenFromDb = await tokenService.findToken(refreshToken);
       
        if(!userData || !tokenFromDb){
            throw ApiError.BadRequest("Unauthorized user");
        }
        const user = await prisma.user_profile.findFirst({where:{
            id:userData.id
        }})
        if (!user) {
            throw ApiError.BadRequest('this user does not exist');
        }
        const tokens = tokenService.generateTokens({login: user.login, roleId: user.roleId});
        await tokenService.saveToken(user.id, tokens.refreshToken)

        return {...tokens, user:user}
    }
}

module.exports = new AuthService();