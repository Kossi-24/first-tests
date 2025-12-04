import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Emprunt = sequelize.define('Emprunt', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  loanDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  returnDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  copyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'Emprunts',
  timestamps: false,
});

export default Emprunt;