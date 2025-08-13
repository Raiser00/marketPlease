const router = require('express').Router();
const ctrl = require('../controllers/market.controller');
const auth = require('../middlewares/auth');

router.post('/', auth.isAdmin, ctrl.create);
router.get('/', ctrl.getAll);
router.get('/open', ctrl.getOpen);
router.put('/:id', auth.isAdmin, ctrl.update);
router.delete('/:id', auth.isAdmin, ctrl.remove);

module.exports = router;
