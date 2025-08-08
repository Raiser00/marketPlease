const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/mailer');

exports.signup = async (req, res) => {
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
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    await sendEmail(email, 'Bienvenue sur MarketPlease', `Clique ici pour valider ton inscription : http://localhost:3000/verify/${token}`);

    return res.status(201).json({
        message: 'Inscription réussi. ' });
};