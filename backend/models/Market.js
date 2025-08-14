const mongoose = require('mongoose');

const marketSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    location: String,
    applicationsStart: Date,
    applicationsEnd: Date,
    eventDate: Date,
    status: { type: String, enum: ['open', 'closed'], default: 'open' }
});
module.exports = mongoose.model('Market', marketSchema);