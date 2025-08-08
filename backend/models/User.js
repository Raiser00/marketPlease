const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: { type: String, unique: true },
    phone: String,
    passwordHash: String,
    role: { type: String, enum: ['admin', 'gestionnaire', 'candidat'], default: 'candidat' },
    verified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);