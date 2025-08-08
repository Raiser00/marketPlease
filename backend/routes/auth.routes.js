const router = require('express').Router();
const ctrl = require('../controllers/auth.controller');

router.post('/signup', ctrl.signup);
router.get('/verify/:token', ctrl.verify);
router.post('/login', ctrl.login);
router.post('/forgot-password', ctrl.forgotPassword);
router.post('/reset-password/:token', ctrl.resetPassword);

module.exports = router;

