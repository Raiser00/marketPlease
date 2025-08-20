const router = require('express').Router();
const ctrl = require('../controllers/market.controller');
const auth = require('../middlewares/auth');
const Market = require('../models/Market');

router.get('/:id', async (req, res) => {
    try {
        const market = await Market.findById(req.params.id);
        if (!market) {
            return res.status(404).json({ message: "marché non trouvé" });    
        }
        res.json(market);
    } catch (err) {
        console.error("erreur GET /markets/:id", err);
        res.status(500).json({ message: "Erreur serveur"});
    }
});


router.post('/', auth.isAdmin, ctrl.create);
router.get('/', ctrl.getAll);
router.get('/open', ctrl.getOpen);
router.put('/:id', auth.isAdmin, ctrl.update);
router.delete('/:id', auth.isAdmin, ctrl.remove);

module.exports = router;
