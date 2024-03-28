const meetupService = require('./service');

class MeetupController {
    async getMeetups(req, res, next) {
        try {
            const meetups = await meetupService.getMeetups();
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
            const meetup = await meetupService.postMeetup(name, description, tags, time_location);
            return res.json(meetup);
        } catch (e) {
            
        }
    }

    async putMeetup(req, res, next) {
        try {
            const {id, name, description, tags, time_location} = req.body;
            const meetup = await meetupService.putMeetup(id, name, description, tags, time_location);
            return res.json(meetup);
        } catch (e) {
            
        }
    }

    async deleteMeetup(req, res, next) {
        try {
            const {id} = req.params;
            const meetup = await meetupService.deleteMeetup(id);
            return res.json(meetup);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new MeetupController();