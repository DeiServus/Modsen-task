const express = require('express');
const meetupController = require('../controllers/meetup-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const roleMiddleware = require('../middlewares/role-middleware');
const requestWrap = require('../middlewares/trycatch-middleware');
const validateMiddlewares = require('../middlewares/validate-middlewares');

const router = express.Router();

router.get(
    '',
    authMiddleware,
    validateMiddlewares.getMeetupValidator,
    requestWrap(meetupController.getMeetups)
)

router.get(
    '/:id',
    authMiddleware,
    requestWrap(meetupController.getMeetupById)
)

router.post(
    '',
    authMiddleware,
    roleMiddleware,
    validateMiddlewares.postMeetupValidator,
    requestWrap(meetupController.postMeetup)
)

router.put(
    '',
    authMiddleware,
    roleMiddleware,
    validateMiddlewares.putMeetupValidator,
    requestWrap(meetupController.putMeetup)
)

router.delete(
    '/:id',
    authMiddleware,
    roleMiddleware,
    requestWrap(meetupController.deleteMeetup)
)

module.exports = router;