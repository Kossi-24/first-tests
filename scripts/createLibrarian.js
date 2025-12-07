// scripts/createLibrarian.js

import dotenv from "dotenv";
import bcrypt from "bcrypt";
import sequelize from "../src/config/db.js";
import User from "../src/models/UserModel.js";

dotenv.config();

const createInitialLibrarian = async () => {
  try {
    await sequelize.authenticate();
    console.log("📡 Database connected");

    // Vérifier s'il existe déjà un LIBRARIAN
    const existingLibrarian = await User.findOne({ where: { role: "LIBRARIAN" } });

    if (existingLibrarian) {
      console.log("Un bibliothécaire existe déjà :", existingLibrarian.email);
      process.exit(0);
    }

    // Mot de passe du librarian (via .env ou défaut)
    const librarianPassword =
      process.env.LIBRARIAN_DEFAULT_PASSWORD || "lib123";

    const hashedPassword = await bcrypt.hash(librarianPassword, 10);

    // Création du librarian
    const librarian = await User.create({
      nom: process.env.LIBRARIAN_DEFAULT_NAME || "Main Librarian",
      email: process.env.LIBRARIAN_DEFAULT_EMAIL || "librarian@system.com",
      password: hashedPassword,
      role: "LIBRARIAN",
      createdAt: new Date(),
    });

    console.log("👨‍🏫 Bibliothécaire créé avec succès !");
    console.log("Email :", librarian.email);
    console.log("Mot de passe :", librarianPassword);
    console.log("Pense à le changer après connexion.");

    process.exit(0);

  } catch (error) {
    console.error("❌ Erreur lors de la création :", error.message);
    process.exit(1);
  }
};

createInitialLibrarian();
