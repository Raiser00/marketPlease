const Market = require('../models/Market');

exports.create = async (req, res) => {
    const market = await Market.create(req.body);
    res.status(201).json(market);
};

