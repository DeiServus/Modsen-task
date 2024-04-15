const express = require('express');
const userController = require('../controllers/user-controller');
const requestWrap = require('../middlewares/trycatch-middleware');

const router = express.Router();

router.post(
    '/registration',
    requestWrap(userController.registration)
)

router.post(
    '/login',
    requestWrap(userController.login)
)

router.get(
    '/logout',
    requestWrap(userController.logout)
)

module.exports = router;