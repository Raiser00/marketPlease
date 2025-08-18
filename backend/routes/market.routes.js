const router = require('express').Router();
const ctrl = require('../controllers/market.controller');
const auth = require('../middlewares/auth');
const Market = require('../models/Market');


router.post('/:id/apply', auth.isUser, async (req, res) => {
    try {
        const market = await Market.findById(req.params.id);
        if (!market) {
            return res.status(404).json({ message: 'Marché non trouvé' });
        }

        if (market.status !== 'open') {
            return res.status(400).json({ message: 'Marché fermé aux candidatures' });
        }

        if (market.applications.includes(req.user.id)) {
            return res.status(400).json({ message: 'Vous avez déjà postulé à ce marché' });
        }

        market.applications.push(req.user.id);
        await market.save();

        res.json({ message: 'Candidature réussie', market });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

router.post('/', auth.isAdmin, ctrl.create);
router.get('/', ctrl.getAll);
router.get('/open', ctrl.getOpen);
router.put('/markets/:id', auth.isAdmin, ctrl.update);
router.delete('/markets/:id', auth.isAdmin, ctrl.remove);

module.exports = router;
