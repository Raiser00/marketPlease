const router = require('express').Router();
const ctrl = require('../controllers/application.controller');
const auth = require('../middlewares/auth');

router.post('/:marketId', auth.isUser, ctrl.postuler);
router.delete('/:id', auth.isUser, ctrl.retirer);
router.get('/mes-candidatures', auth.isUser, ctrl.mesCandidatures);
router.put('/:id/accepter', auth.isAdmin, ctrl.attribuer);

module.exports = router;