const meetupService = require('../services/meetup-service');
const userService = require('../services/user-service');

class MeetupController {
    async getMeetups(req, res) {
        const {searchTerm, sort, page, pageSize} = req.query;

        const meetups = await meetupService.getMeetups(searchTerm, sort, page, pageSize);
        return res.status(200).json(meetups);
    }

    async getMeetupById(req, res) {
        const {id} = req.params;
        const meetup = await meetupService.getMeetupById(id);
        return res.json(meetup);
    }

    async postMeetup(req, res) {
        const {name, description, tags, time_location, organizerId} = req.body;

        const check = await userService.getUserById(organizerId);
        if(!check) {
            return res.status(404).json({ error: "This user doesn't exist" });
        }
        
        const meetup = await meetupService.postMeetup(name, description, tags, time_location, organizerId);
        return res.status(200).json(meetup);
    }

    async putMeetup(req, res) {
        const {id, name, description, tags, time_location} = req.body;

        const check = await meetupService.getMeetupById(id);
        if(!check.meetup){
            return res.status(404).json({ error: "This user doesn't exist" });
        }
        const meetup = await meetupService.putMeetup(id, name, description, tags, time_location);
        return res.status(200).json(meetup);
    }

    async deleteMeetup(req, res) {
        const {id} = req.params;
        const check = await meetupService.getMeetupById(id);
        if(!check.meetup){
            return res.status(404).json({ error: "This user doesn't exist" });
        }
        const meetup = await meetupService.deleteMeetup(id);
        return res.status(200).json(meetup);
    }
}

module.exports = new MeetupController();