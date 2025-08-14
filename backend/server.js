require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // pour parser le JSON des requêtes

const marketRoutes = require('./routes/market.routes');
app.use('/api/markets', marketRoutes);

console.log("⏳ Tentative de connexion à MongoDB...");
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("✅ Connexion à MongoDB réussie");

    
    app.listen(port, () => {
        console.log(`🚀 Serveur lancé sur le port ${port}`);
    });
})
.catch((err) => {
    console.error("❌ Erreur de connexion à MongoDB :", err);
});


app.use((req, res, next) => {
    res.status(404).json({ message: "Route non trouvée" });
});