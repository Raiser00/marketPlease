const router = require('express').Router();
const ctrl = require('../controllers/user.controller');
const auth = require('../middlewares/auth');
const User = require('../models/User');

// User routes
router.get('/me', auth.isUser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('markets');
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.json({
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            markets: user.markets || [],
    });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

router.delete('/me', auth.isUser, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.json({ message: 'Compte supprimé avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});



// Admin route
router.get('/', auth.isAdmin, ctrl.getAllUsers);
router.put('/users/:id', auth.isAdmin, ctrl.updateUser);
router.delete('/:id', auth.isAdmin, ctrl.deleteUser);

module.exports = router;