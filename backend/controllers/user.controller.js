const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
    const users = await User.find({}, '-passwordHash');
    res.json(users);
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndUpdate(id, req.body);
    res.json({ message: 'Utilisateur mis à jour' });
};

exports.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Utilisateur supprime' });
};

exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id, '-passwordHash');
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};
