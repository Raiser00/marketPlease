const Market = require('../models/Market');

exports.create = async (req, res) => {
    const market = await Market.create(req.body);
    res.status(201).json(market);
};

exports.getAll = async (req, res) => {
    const markets = await Market.find();
    res.json(markets);
};

exports.getOpen = async (req, res) => {
    const now = new Date();
    const markets = await Market.find({ 'applicationPeriod.end': { $gt: now } });
    res.json(markets);
};

exports.update = async (req, res) => {
    await Market.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Marché mis à jour' });
};

exports.remove = async (req, res) => {
    await Market.findByIdAndDelete(req.params.id);
    res.json({ message: 'Marché supprimé' });
};
