const mongoose = require('mongoose');
require('dotenv').config();

console.log("⏳ Tentative de connexion à MongoDB...");

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connecté à MongoDB !");
    process.exit();
  })
  .catch((err) => {
    console.error("❌ Erreur de connexion :", err);
    process.exit(1);
  });
