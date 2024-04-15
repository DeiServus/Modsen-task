const jwt = require('jsonwebtoken');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

class TokenService{
    generateTokens(payload){
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {expiresIn:process.env.ACCESS_TIME})
        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {expiresIn:process.env.REFRESH_TIME})
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken){
        const tokenData = await prisma.tokens.findUnique({where:{
            userId: parseInt(userId)
        }})
        if(tokenData){
            tokenData.refreshToken = refreshToken;
            return await prisma.tokens.update({
                where: {
                    userId: parseInt(userId)
                },
                data: {
                    refreshToken: refreshToken
                }
            })
        }
        const token = await prisma.tokens.create({
            data:{
                userId: parseInt(userId),
                refreshToken:refreshToken
            }
        })
        return token;
    }

    async removeToken(refreshToken){
        const tokenData = await prisma.tokens.delete({where:{
            refreshToken:refreshToken
        }});
        return tokenData;
    }

    async findToken(refreshToken){
        const tokenData = await prisma.tokens.findFirst({where:{
            refreshToken:refreshToken
        }});
        return tokenData;
    }

    validateToken(token, secret){
        try {
            const userData = jwt.verify(token, secret);
            return userData;
        } catch(e) {
            return null;
        }
    }
}

module.exports = new TokenService();