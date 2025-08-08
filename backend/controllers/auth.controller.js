const user = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { firstName, lastName, email, phone, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email déjà utilisé' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
        firstName,
        lastName,
        email,
        phone,
        passwordHash
    });

    // test envoi email
    return res.status(201).json({
        message: 'Utilisateur créé avec succès' });
};