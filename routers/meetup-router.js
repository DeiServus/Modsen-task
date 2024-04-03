const express = require('express');
const meetupController = require('../controllers/meetup-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const roleMiddleware = require('../middlewares/role-middleware');

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
    roleMiddleware,
    meetupController.postMeetup
)

router.put(
    '/meetup',
    authMiddleware,
    roleMiddleware,
    meetupController.putMeetup
)

router.delete(
    '/meetup/:id',
    authMiddleware,
    roleMiddleware,
    meetupController.deleteMeetup
)

module.exports = router;