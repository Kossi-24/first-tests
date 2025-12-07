// src/middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/UserModel.js";

dotenv.config();

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('authenticate: decoded.sub =', decoded.sub);

    // Récupérer l'utilisateur complet depuis la base
    const user = await User.findByPk(decoded.sub);
    console.log('authenticate: user found =', user ? user.id : 'null');

    if (!user) {
      console.log('authenticate: user not found, returning 404');
      return res.status(404).json({ message: "User not found" });
    }

    // Stocke l'utilisateur complet → important pour /me
    req.user = user;
    next();

  } catch (err) {
    console.log('authenticate: error =', err.message);
    return res.status(401).json({ message: "Invalid token", error: err.message });
  }
};
