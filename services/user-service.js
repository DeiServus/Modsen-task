const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const tokenService = require('./token-service');
const bcrypt = require('bcrypt');

class UserService {
    async registration(login, password) {
        const hashPassword = bcrypt.hashSync(password, 3);
        const user = await prisma.users.create({
            data:{
                login: login,
                password:hashPassword
            }
        })
        const tokens = tokenService.generateTokens({...user.login})
        await tokenService.saveToken(user.id, tokens.refreshToken)
        return {...tokens, user:user}
    }

    async login(login, password) {
        const user = await prisma.users.findFirst({ where: { login: login } });
        const isPassEquels = await bcrypt.compare(password, user.password);
        if (!isPassEquels) {
            throw Error('Неверный пароль');
        }
        
        const tokens = tokenService.generateTokens({...user.login});
        await tokenService.saveToken(user.id, tokens.refreshToken)
        return {...tokens, user:user}
    }

    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken){
        if(!refreshToken){
            throw Error("Проблемы с токеном 1");
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
       
        if(!userData || !tokenFromDb){
            throw Error("Проблемы с токеном 2");
        }
        const user = await prisma.user_profile.findFirst({where:{
            id:userData.id
        }})
        const tokens = tokenService.generateTokens({...user.login});
        await tokenService.saveToken(user.id, tokens.refreshToken)

        return {...tokens, user:user}
    }
}

module.exports = new UserService();