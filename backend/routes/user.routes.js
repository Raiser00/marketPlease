const router = require('express').Router();
const ctrl = require('../controllers/user.controller');
const auth = require('../middlewares/auth');

router.get('/', auth.isAdmin, ctrl.getAllUsers);
router.put('/:id', auth.isAdmin, ctrl.updateUser);
router.delete('/:id', auth.isAdmin, ctrl.deleteUser);

module.exports = router;