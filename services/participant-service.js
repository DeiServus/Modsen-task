const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const ApiError = require("../exceptions/api-error");
const userService = require('./user-service');
const meetupService = require('./meetup-service');

class ParticipantService {
    async postParticipant(userId, meetupId) {
        const checkUser = await userService.getUserById(userId);
        if(!checkUser){
            throw ApiError.BadRequest("this user does not exist")
        }

        const checkMeetup = await meetupService.getMeetupById(meetupId);
        if(!checkMeetup.meetup){
            throw ApiError.BadRequest("this meetup does not exist")
        }

        const participant = await prisma.participants.create({
            data:{
                userId: parseInt(userId),
                meetupId: parseInt(meetupId)
            }
        })
        return participant;
    }

    async deleteParticipant(id) {
        const check = await prisma.participants.findFirst({
            where: {
                id: parseInt(id)
            }
        })
        if(!check){
            throw ApiError.BadRequest("this participant does not exist")
        }
        const participant =  await prisma.participants.delete({
            where: {
                id: parseInt(id)
            }
        });
        return {participant: participant};
    }
}

module.exports = new ParticipantService();