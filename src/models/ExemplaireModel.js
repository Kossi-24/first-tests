import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Exemplaire = sequelize.define('Exemplaire', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  status: {
    type: DataTypes.ENUM('AVAILABLE', 'BORROWED', 'LOST', 'RESERVED', 'DAMAGED'),
    defaultValue: 'AVAILABLE',
  },
  barcode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'Exemplaires',
  timestamps: false,
});

export default Exemplaire;