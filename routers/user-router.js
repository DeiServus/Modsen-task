const express = require('express');
const userController = require('../controllers/user-controller');

const router = express.Router();

router.post(
    '/registration',
    userController.registration
)

router.post(
    '/login',
    userController.login
)

router.get(
    '/logout',
    userController.logout
)

module.exports = router;