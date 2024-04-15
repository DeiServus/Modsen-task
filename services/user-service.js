const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const tokenService = require('./token-service');
const bcrypt = require('bcrypt');

class UserService {
    async registration(login, password) {
        const check = await prisma.users.findFirst({
            where: {
                login: login
            }
        })
        if(check){
            throw Error("Пользователь уже есть в базе")
        }
        const hashPassword = this.hashPasswordSync(password);
        const user = await prisma.users.create({
            data:{
                login: login,
                password: hashPassword
            }
        })
        const tokens = tokenService.generateTokens({login: user.login, role: user.isOrganizer})
        await tokenService.saveToken(user.id, tokens.refreshToken)
        return {...tokens, user:user}
    }

    hashPasswordSync(password) {
        return bcrypt.hashSync(password, 3);
    }

    async login(login, password) {
        const user = await prisma.users.findFirst({ where: { login: login } });
        if (!user) {
            throw Error('this user does not exist');
        }
        const isPassEquels = await bcrypt.compare(password, user.password);
        if (!isPassEquels) {
            throw Error('Something is wrong');
        }
        
        const tokens = tokenService.generateTokens({login: user.login, role: user.isOrganizer});
        await tokenService.saveToken(user.id, tokens.refreshToken)
        return {...tokens, user:user}
    }

    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken){
        if(!refreshToken){
            throw Error("Unauthorized user");
        }
        const userData = tokenService.validateToken(refreshToken, process.env.REFRESH_SECRET);
        const tokenFromDb = await tokenService.findToken(refreshToken);
       
        if(!userData || !tokenFromDb){
            throw Error("Unauthorized user");
        }
        const user = await prisma.user_profile.findFirst({where:{
            id:userData.id
        }})
        if (!user) {
            throw Error('this user does not exist');
        }
        const tokens = tokenService.generateTokens({login: user.login, role: user.isOrganizer});
        await tokenService.saveToken(user.id, tokens.refreshToken)

        return {...tokens, user:user}
    }
}

module.exports = new UserService();