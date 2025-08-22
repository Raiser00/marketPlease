const Application = require('../models/Application');
const Market = require('../models/Market');
const User = require(('../models/User'));

exports.postuler = async (req, res) => {
    try {
        const { marketId } = req.body;

        // Vérifier si l'utilisateur a déjà ce marché attribué
        const user = await User.findById(req.user.id);
        if (user.markets.includes(marketId)) {
            return res.status(400).json({ message: "Vous avez déjà ce marché attribué." });
        }

        // Vérifier si une candidature existe déjà
        const existingApp = await Application.findOne({
            user: req.user.id,
            market: marketId
        });

        if (existingApp) {
            return res.status(400).json({ message: "Vous avez déjà postulé à ce marché." });
        }

        // Sinon créer une nouvelle candidature
        const app = new Application({
            user: req.user.id,
            market: marketId,
            status: "pending"
        });

        await app.save();
        res.json(app);
    } catch (error) {
        console.error("Erreur postuler:", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
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

exports.getMyAssignedMarkets = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('markets');
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Retourner seulement les marchés
    res.json(user.markets || []);
  } catch (error) {
    console.error("Erreur getMyAssignedMarkets:", error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};



exports.leaveMarket = async (req, res) =>
{
    try
    {
        const { id } = req.params;
        const app = await Application.findOneAndUpdate
        (
            { market: id, user: req.user.id, status: 'accepted' },
            { status: 'cancelled' },
            { new: true}
        );
        if (!app) return res.status(404).json({ message: "marché non trouvé" });
        res.json({ message: "vous avez quitté ce marché" });
    } catch (error)
    {
        console.error("erreur leaveMarket", error);
        res.status(500).json({ message: "erreur serveur"});
    }
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