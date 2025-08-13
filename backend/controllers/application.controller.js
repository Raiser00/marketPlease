const Application = require('../models/Application');
const Market = require('../models/Market');

exports.postuler = async (req, res) => {
    const application = await Application.create({
        userId: req.user._id,
        marketId: req.params.marketId,
        status: 'En attente',
    });
    res.status(201).json(application);
};

exports.retirer = async (req, res) => {
    await Application.findOneAndDelete({
        _id: req.params.id,
        userId: req.user._id,
    });
    res.json({ message: 'Candidature retirée' });
};

exports.mesCandidatures = async (req, res) => {
    const apps = await Application.find({ userId: req.user._id }).populate('marketId');
    res.json(apps);
};

exports.attribuer = async (req, res) => {
    const { id } = req.params; // Application ID

    const selected = await Application.findByIdAndUpdate(id, { status: 'Attribuée' });
    await Application.updateMany(
        { marketId: selected.marketId, _id: { $ne: id } },
        { status: 'Rejetée' }
    );

    await Market.findByIdAndUpdate(selected.marketId, { assignedTo: selected.userId });
    res.json({ message: 'Candidature attribuée' });
};
