const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

class MeetupService {
    async getMeetups() {
        const meetups = await prisma.meetups.findMany();
        return {meetups: meetups};
    }

    async getMeetupById(id) {
        const meetup =  await prisma.meetups.findFirst({
            where: {
                id: +id
            }
        });
        return {meetup: meetup};
    }

    async postMeetup(name, description, tags, time_location) {
        const meetup = await prisma.meetups.create({
            data: {
                name: name,
                description: description,
                tags: tags,
                time_location: time_location
            }
        });
        return {meetup: meetup};
    }

    async putMeetup(id, name, description, tags, time_location) {
        const meetup = await prisma.meetups.update({
            where: {
                id: id
            },
            data: {
                name: name,
                description: description,
                tags: tags,
                time_location: time_location
            }
        });
        return {meetup: meetup};
    }

    async deleteMeetup(id) {
        const meetup =  await prisma.meetups.delete({
            where: {
                id: +id
            }
        });
        return {meetup: meetup};
    }
}

module.exports = new MeetupService();