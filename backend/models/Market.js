const { application } = require('express');
const mongoose = require('mongoose');

const marketSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    eventDate: { type: Date, required: true },
    applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'application' }],
    status: { type: String, enum: ['open', 'closed'], default: 'open' }
});
module.exports = mongoose.model('Market', marketSchema);