const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 3;
const DEFAULT_SORT = 'asc';

class MeetupService {
    async getMeetups(searchTerm = "", sort = DEFAULT_SORT, page = DEFAULT_PAGE, pageSize = DEFAULT_PAGE_SIZE) {
        const skip = (page - 1) * pageSize;
        let order = {};

        if(sort === 'asc' || sort === 'desc') {
            order['id'] = sort;
        }
        const meetups = await prisma.meetups.findMany({
            where: {
                OR: [
                    { name: {contains: searchTerm} },
                    { description: {contains: searchTerm} },
                    { tags: {contains: searchTerm} },
                    { time_location: {contains: searchTerm} }
                ]
            },
            skip: skip,
            take: parseInt(pageSize),
            orderBy: order
        });
        return {meetups: meetups};
    }

    async getMeetupById(id) {
        const meetup =  await prisma.meetups.findFirst({
            where: {
                id: parseInt(id)
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
                id: parseInt(id)
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
                id: parseInt(id)
            }
        });
        return {meetup: meetup};
    }
}

module.exports = new MeetupService();