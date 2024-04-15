const express = require('express');
const authController = require('../controllers/auth-controller');
const requestWrap = require('../middlewares/trycatch-middleware');

const router = express.Router();

router.post(
    '/registration',
    requestWrap(authController.registration)
)

router.post(
    '/login',
    requestWrap(authController.login)
)

router.get(
    '/logout',
    requestWrap(authController.logout)
)

module.exports = router;