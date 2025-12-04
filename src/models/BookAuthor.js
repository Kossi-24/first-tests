import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const BookAuthor = sequelize.define('BookAuthor', {
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Books',
      key: 'id',
    },
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Authors',
      key: 'id',
    },
  },
}, {
  tableName: 'BookAuthors',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['bookId', 'authorId'],
    },
  ],
});

export default BookAuthor;