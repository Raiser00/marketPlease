const router = require('express').Router();
const ctrl = require('../controllers/auth.controller');

router.post('/signup', ctrl.signup);
router.get('/verifyCode', ctrl.verifyCode);
router.post('/verify', ctrl.verifyCode);
router.post('/login', ctrl.login);
router.post('/forgot-password', ctrl.forgotPassword);
router.post('/reset-password/:token', ctrl.resetPassword);

module.exports = router;

