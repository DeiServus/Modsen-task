const express = require('express');
const participantController = require('../controllers/participant-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const roleMiddleware = require('../middlewares/role-middleware');
const requestWrap = require('../middlewares/trycatch-middleware');
const validateMiddlewares = require('../middlewares/validate-middlewares');

const router = express.Router();

router.post(
    '',
    authMiddleware,
    roleMiddleware,
    validateMiddlewares.postParticipantValidator,
    requestWrap(participantController.postParticipant)
)

router.delete(
    '/:id',
    authMiddleware,
    roleMiddleware,
    requestWrap(participantController.deleteParticipant)
)

module.exports = router;