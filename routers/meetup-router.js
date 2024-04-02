const express = require('express');
const meetupController = require('../controllers/meetup-controller');
const authMiddleware = require('../middlewares/auth-middleware');

const router = express.Router();

router.get(
    '/meetup',
    authMiddleware,
    meetupController.getMeetups
)

router.get(
    '/meetup/:id',
    authMiddleware,
    meetupController.getMeetupById
)

router.post(
    '/meetup',
    authMiddleware,
    meetupController.postMeetup
)

router.put(
    '/meetup',
    authMiddleware,
    meetupController.putMeetup
)

router.delete(
    '/meetup/:id',
    authMiddleware,
    meetupController.deleteMeetup
)

module.exports = router;