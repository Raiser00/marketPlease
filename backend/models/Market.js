const { application } = require('express');
const mongoose = require('mongoose');

const marketSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    eventDate: { type: Date, required: true },
    applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }],
    status: { type: String, enum: ['open', 'closed'], default: 'open' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null}
});
module.exports = mongoose.model('Market', marketSchema);