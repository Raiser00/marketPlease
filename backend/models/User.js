const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['admin', 'gestionnaire', 'candidat'], default: 'gestionnaire' },
    verified: { type: Boolean, default: false },
    verifyCode: { type: String, default: null },
    verifyCodeExpires: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);