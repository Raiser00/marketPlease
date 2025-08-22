const Application = require('../models/Application');
const Market = require('../models/Market');
const User = require(('../models/User'));

exports.postuler = async (req, res) => {
    const marketId = req.params.marketId;

    const market = await Market.findById(marketId);
    if (!market) return res.status(404).json({ message: 'Marché introuvable' });
    if (market.status !== 'open') return res.status(400).json({ message: 'Marché fermé aux candidatures' });

    const existing = await Application.findOne({ market: marketId, user: req.user._id });
    if (existing) return res.status(400).json({ message: 'Vous avez déjà postulé à ce marché' });

    const app = await Application.create({
      market: marketId,
      user: req.user.id,
      status: 'pending',
    });

  res.status(201).json(app);
};

exports.retirer = async (req, res) => {
    await Application.findOneAndDelete({
        _id: req.params.id,
        user: req.user.id,
    });
    res.json({ message: 'Candidature retirée' });
};

exports.mesCandidatures = async (req, res) => {
    const apps = await Application.find({ user: req.user._id }).populate('market', 'name description status eventDate');
    res.json(apps);
};

exports.forMarket = async (req, res) => {
    const { marketId } = req.params;
    const apps = await Application.find({ market: marketId }).populate('user', 'firstName lastName email');
    res.json(apps);
}

exports.attribuer = async (req, res) => {
    try {
        const { id } = req.params; // id de l'application
        const selected = await Application.findById(id);
        if (!selected) return res.status(404).json({ message: 'Candidature introuvable' });

        console.log("debug selected:", selected);

        // accepte celle-ci
        await Application.findByIdAndUpdate(id, { status: 'accepted' });

        // rejette toutes les autres
        await Application.updateMany(
            { market: selected.market, _id: { $ne: id } },
            { status: 'rejected' }
        );

        console.log("debug attribuer → id:", id);
        console.log("debug attribuer → selected.market:", selected.market);
        console.log("debug attribuer → selected.user:", selected.user);

        // met à jour le marché
        const updatedMarket = await Market.findByIdAndUpdate(
            selected.market, 
            { assignedTo: selected.user },
            { new: true }
        );

        // met à jour le user
        await User.findByIdAndUpdate(selected.user, { 
        $push: { markets: selected.market } 
        });

        res.json({ message: 'Candidature attribuée' });
    } catch (err) 
    {
        console.error("erreur attribuer", err);
        res.status(500).json({ message: 'erreur serveur', error: err.message});
    }
};

exports.getByMarket = async (req, res) => {
    const { marketId } = req.params;
    const apps = await Application.find({ marketId })
        .populate('userId', 'firstName lastName email')
        .populate('marketId', 'name description eventDate status');
    res.json(apps);
};