require('dotenv').config();
const mongoose = require('mongoose');
const Market = require('./models/Market');

const seedMarkets = async () => {
  try {
    console.log("⏳ Connexion à MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);

    console.log("🗑 Suppression des marchés existants...");
    await Market.deleteMany();

    console.log("➕ Insertion de marchés de test...");
    await Market.insertMany([
      {
        name: "Marché de Noël",
        description: "Vente de produits artisanaux et alimentaires locaux.",
        location: "Place centrale",
        applicationsStart: new Date("2025-09-01"),
        applicationsEnd: new Date("2025-10-15"),
        eventDate: new Date("2025-12-15"),
        status: "open"
      },
      {
        name: "Marché de Printemps",
        description: "Produits frais, fleurs et artisanat.",
        location: "Parc municipal",
        applicationsStart: new Date("2025-02-01"),
        applicationsEnd: new Date("2025-03-15"),
        eventDate: new Date("2025-04-10"),
        status: "closed"
      },
      {
        name: "Marché Nocturne",
        description: "Événement nocturne avec concerts et stands variés.",
        location: "Quai de la rivière",
        applicationsStart: new Date("2025-06-01"),
        applicationsEnd: new Date("2025-07-15"),
        eventDate: new Date("2025-08-05"),
        status: "open"
      }
    ]);

    console.log("✅ Marchés insérés avec succès !");
  } catch (error) {
    console.error("❌ Erreur lors du seed :", error);
  } finally {
    mongoose.connection.close();
    console.log("🔌 Connexion fermée");
  }
};

seedMarkets();
