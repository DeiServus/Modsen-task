const meetupDTO = require('../dto/dto');
const getMeetupsSchema = require('../dto/meetup-dto')

const postMeetupValidator = (req, res, next) => {
    const { error } = meetupDTO.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const putMeetupValidator = (req, res, next) => {
    const {id} = req.body;
    const { error } = meetupDTO.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    if (!id) {
        return res.status(400).json({ error: "there is no id" });
    }
    next();
};

const getMeetupValidator = (req, res, next) => {
    const { error } = getMeetupsSchema.validate(req.query);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = {
    postMeetupValidator,
    putMeetupValidator,
    getMeetupValidator
};