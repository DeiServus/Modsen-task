const participantService = require('../services/participant-service');

class ParticipantController {
    async postParticipant(req, res) {
        const {userId, meetupId} = req.body;

        const participant = await participantService.postParticipant(userId, meetupId);
        return res.status(200).json(participant);
    }

    async deleteParticipant(req, res) {
        const {id} = req.params;
        const participant = await participantService.deleteParticipant(id);
        return res.status(200).json(participant);
    }
}

module.exports = new ParticipantController();