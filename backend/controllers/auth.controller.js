const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/mailer');

exports.signup = async (req, res) => {
    try {
    const { firstName, lastName, email, phone, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email déjà utilisé' });

    const passwordHash = await bcrypt.hash(password, 10);

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const verifyCodeExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 heures

    const user = await User.create({
        firstName,
        lastName,
        email,
        phone,
        passwordHash,
        verifyCode,
        verifyCodeExpires,
        verified: false
    });

    
    await sendEmail(email, 'Code de vérification MarketPlease', `
        Bonjour ${firstName},<br/>
        Voici votre code de vérification : <b>${verifyCode}</b><br/>
        Ce code expire dans 24 heures.
    `);

    return res.status(201).json({
        message: 'Inscription réussi. Vérifier votre boite mail. ' });
    } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        return res.status(400).json({ message: 'Erreur serveur' });
    }
};

exports.verifyCode = async (req, res) => {
    const { email, code } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Utilisateur introuvable' });

    if (user.verified) return res.status(400).json({ message: 'Compte déjà vérifié' });

    if (user.verifyCode !== code) return res.status(400).json({ message: 'Code invalide' });

    if (user.verifyCodeExpires < new Date()) return res.status(400).json({ message: 'Code expiré' });

    user.verified = true;
    user.verifyCode = undefined;
    user.verifyCodeExpires = undefined;
    await user.save();

    res.json({ message: 'Compte vérifié avec succès' });
};


exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.verified) 
        {
        return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(400).json({ message: 'Email ou mot de passe incorrect' });

    const token = jwt.sign({ id:user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User introuvable' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    await sendEmail(email, 'Réinitialisation de mot de passe', `Clique ici pour réinitialiser ton mot de passe : http://localhost:3000/reset/${token}`);

    res.json({ message: 'Email de réinitialisation envoyé' });
};

exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        const passwordHash = await bcrypt.hash(password, 10);
        await User.findByIdAndUpdate(id, { passwordHash });
        res.json({ message: 'Mot de passe réinitialisé avec succès' });
    } catch (e) {
        res.status(400).json({ message: 'Token invalide ou expiré' });
    }
};