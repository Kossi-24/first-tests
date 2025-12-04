import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/associations.js';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

const AuthService = {
  register: async ({ nom, email, password, role = 'MEMBER' }) => {
    // check existing
    const existing = await User.findOne({ where: { email } });
    if (existing) throw new Error('Email already in use');

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ nom, email, password: hashed, role });
    // exclude password when returning (if repository returns it, remove in controller)
    return user;
  },

  login: async ({ email, password }) => {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('Invalid credentials');

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new Error('Invalid credentials');

    // create JWT payload (minimal)
    const payload = { sub: user.id, role: user.role, email: user.email };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return { user, token };
  },

  verifyToken: (token) => {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (err) {
      throw new Error('Invalid token');
    }
  }
};

export default AuthService;
