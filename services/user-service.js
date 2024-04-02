const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
class UserService {
    async registration(login, password) {
        const user = await prisma.u

    }

    async login(login, password) {

    }

    async logout() {

    }
}

module.exports = new UserService();