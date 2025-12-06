// scripts/createAdmin.js

import dotenv from "dotenv";
import bcrypt from "bcrypt";
import sequelize from "../src/config/db.js";
import User from "../src/models/UserModel.js";

dotenv.config();

const createInitialAdmin = async () => {
  try {
    await sequelize.authenticate();
    console.log("📡 Database connected");

    // Vérifier s'il existe déjà un admin
    const existingAdmin = await User.findOne({ where: { role: "ADMIN" } });

    if (existingAdmin) {
      console.log("Un administrateur existe déjà :", existingAdmin.email);
      process.exit(0);
    }

    // Mot de passe admin -> soit env soit valeur par défaut
    const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD || "admin123";

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const admin = await User.create({
      nom: process.env.ADMIN_DEFAULT_NAME || "Super Admin",
      email: process.env.ADMIN_DEFAULT_EMAIL || "admin@system.com",
      password: hashedPassword,
      role: "ADMIN",
      createdAt: new Date(),
    });

    console.log("Administrateur créé !");
    console.log("Email :", admin.email);
    console.log("Mot de passe :", adminPassword);
    console.log("Pense à le changer après connexion.");

    process.exit(0);

  } catch (error) {
    console.error(" Erreur lors de la création :", error.message);
    process.exit(1);
  }
};

createInitialAdmin();
