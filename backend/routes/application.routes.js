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

router.get('/', auth.isAdmin, async (req, res) =>
{
    try
    {
        const apps = await Application.find()
        .populate('user', 'firstName lastName email')
        .populate('market', 'name description eventDate status');
        res.json(apps);
    } catch (err)
    {
        console.error(err);
        res.status(500).json({ message: 'erreur serveur'});
    }
});

router.post('/:id/accept', auth.isAdmin, ctrl.attribuer);

router.post('/:id/reject', auth.isAdmin, async (req, res) =>
{
    try
    {
        const app = await Application.findById(req.params.id);
        if (!app) return res.status(404).json({ message: 'candidature introuvale' });

        app.status = 'rejected';
        await app.save();
        res.json(app);
    } catch (err)
    {
        console.error(err);
        res.status(500).json({ message: 'erreur serveur' });
    }
})

router.get('/for-market/:marketId', auth.isAdmin, ctrl.forMarket);
router.put('/:id/accepted', auth.isAdmin, ctrl.attribuer);

module.exports = router;