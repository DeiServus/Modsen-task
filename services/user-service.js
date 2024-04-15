const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const ApiError = require("../exceptions/api-error");

class UserService {
    async postUser(login, password) {
        const check = await this.getUserByLogin(login);
        if(check){
            throw ApiError.BadRequest("user already exists")
        }
        const hashPassword = this.hashPasswordSync(password);
        const user = await prisma.users.create({
            data:{
                login: login,
                password: hashPassword
            }
        })
        return user;
    }

    async getUserByLogin(login) {
        const check = await prisma.users.findFirst({
            where: {
                login: login
            }
        });
        return check;
    }

    hashPasswordSync(password) {
        return bcrypt.hashSync(password, 3);
    }
}

module.exports = new UserService();