const express = require('express');
const meetupController = require('../controllers/meetup-controller');

const router = express.Router();

router.get(
    '/meetup',
    meetupController.getMeetups
)

router.get(
    '/meetup/:id',
    meetupController.getMeetupById
)

router.post(
    '/meetup',
    meetupController.postMeetup
)

router.put(
    '/meetup',
    meetupController.putMeetup
)

router.delete(
    '/meetup/:id',
    meetupController.deleteMeetup
)

module.exports = router;