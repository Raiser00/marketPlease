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

