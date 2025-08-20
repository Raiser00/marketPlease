const router = require('express').Router();
const ctrl = require('../controllers/application.controller');
const auth = require('../middlewares/auth');
const Application = require('../models/Application');

/* router.get('/for-market/:marketId', auth.isAdmin, async (req, res) => {
    const apps = await Application.find({ marketId: req.params.marketId })
    .populate('userId');
    res.json(apps);
}); */

router.post('/:marketId', auth.isUser, ctrl.postuler);
router.delete('/:id', auth.isUser, ctrl.retirer);
router.get('/mes-candidatures', auth.isUser, ctrl.mesCandidatures);

router.get('/for-market/:marketId', auth.isAdmin, ctrl.forMarket);
router.put('/:id/accepter', auth.isAdmin, ctrl.attribuer);

module.exports = router;