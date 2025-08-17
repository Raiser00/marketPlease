const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    market: { type: mongoose.Schema.Types.ObjectId, ref: 'Market', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Application', applicationSchema);
