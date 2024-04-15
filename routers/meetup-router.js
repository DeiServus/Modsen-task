const express = require('express');
const meetupController = require('../controllers/meetup-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const roleMiddleware = require('../middlewares/role-middleware');
const requestWrap = require('../middlewares/trycatch-middleware');

const router = express.Router();

router.get(
    '/meetup',
    authMiddleware,
    requestWrap(meetupController.getMeetups)
)

router.get(
    '/meetup/:id',
    authMiddleware,
    requestWrap(meetupController.getMeetupById)
)

router.post(
    '/meetup',
    authMiddleware,
    roleMiddleware,
    requestWrap(meetupController.postMeetup)
)

router.put(
    '/meetup',
    authMiddleware,
    roleMiddleware,
    requestWrap(meetupController.putMeetup)
)

router.delete(
    '/meetup/:id',
    authMiddleware,
    roleMiddleware,
    requestWrap(meetupController.deleteMeetup)
)

module.exports = router;