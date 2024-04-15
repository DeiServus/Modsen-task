const express = require('express');
const meetupController = require('../controllers/meetup-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const roleMiddleware = require('../middlewares/role-middleware');
const requestWrap = require('../middlewares/trycatch-middleware');
const validateMiddlewares = require('../middlewares/validate-middlewares');

const router = express.Router();

router.get(
    '/meetup',
    authMiddleware,
    validateMiddlewares.getMeetupValidator,
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
    validateMiddlewares.postMeetupValidator,
    requestWrap(meetupController.postMeetup)
)

router.put(
    '/meetup',
    authMiddleware,
    roleMiddleware,
    validateMiddlewares.putMeetupValidator,
    requestWrap(meetupController.putMeetup)
)

router.delete(
    '/meetup/:id',
    authMiddleware,
    roleMiddleware,
    requestWrap(meetupController.deleteMeetup)
)

module.exports = router;