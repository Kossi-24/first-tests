import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  role: {
    type: DataTypes.ENUM('ADMIN', 'LIBRARIAN', 'MEMBER'),
    defaultValue: 'MEMBER',
  },

  // 🔥 NOUVEAU : utilisateur qui a créé ce compte
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: true, // un admin racine peut être null
    references: {
      model: 'Users',
      key: 'id',
    },
  },

  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'Users',
  timestamps: false,
});

// 🔥 Association pour que Sequelize comprenne la relation
User.belongsTo(User, {
  as: 'creator',
  foreignKey: 'createdBy',
});

export default User;
