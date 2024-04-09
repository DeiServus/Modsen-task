const meetupService = require('../services/meetup-service');
const meetupDTO = require('../dto');

class MeetupController {
    async getMeetups(req, res, next) {
        try {
            const {searchTerm, sort, page, pageSize} = req.query;

            const meetups = await meetupService.getMeetups(searchTerm, sort, page, pageSize);
            return res.json(meetups);
        } catch (e) {
            next(e);
        }
    }

    async getMeetupById(req, res, next) {
        try {
            const {id} = req.params;
            const meetup = await meetupService.getMeetupById(id);
            return res.json(meetup);
        } catch (e) {
            next(e);
        }
    }

    async postMeetup(req, res, next) {
        try {
            const {name, description, tags, time_location} = req.body;

            const { error } = meetupDTO.validate({ name, description, tags, time_location });
            if (error) {
                throw new Error("Problems with validation");
            }

            const meetup = await meetupService.postMeetup(name, description, tags, time_location);
            return res.json(meetup);
        } catch (e) {
            next(e);
        }
    }

    async putMeetup(req, res, next) {
        try {
            const {id, name, description, tags, time_location} = req.body;

            const { error } = meetupDTO.validate({ name, description, tags, time_location });
            if (error || !id) {
                throw new Error("Problems with validation");
            }
            const check = await meetupService.getMeetupById(id);
            if(!check.meetup)
                throw new Error("Такого пользователя не существует");

            const meetup = await meetupService.putMeetup(id, name, description, tags, time_location);
            return res.json(meetup);
        } catch (e) {
            next(e);
        }
    }

    async deleteMeetup(req, res, next) {
        try {
            const {id} = req.params;
            const check = await meetupService.getMeetupById(id);
            if(!check.meetup)
                throw new Error("Такого пользователя не существует");
            const meetup = await meetupService.deleteMeetup(id);
            return res.json(meetup);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new MeetupController();