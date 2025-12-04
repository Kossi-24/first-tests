import { Op } from 'sequelize';
import { Book } from '../models/associations.js';

class BookRepository {
  async create(bookData) {
    try {
      return await Book.create(bookData);
    } catch (error) {
      throw new Error(`Database error creating book: ${error.message}`);
    }
  }

  async findAll(options = {}) {
    try {
      return await Book.findAll(options);
    } catch (error) {
      throw new Error(`Database error fetching books: ${error.message}`);
    }
  }

  async findById(id, options = {}) {
    try {
      return await Book.findByPk(id, options);
    } catch (error) {
      throw new Error(`Database error fetching book: ${error.message}`);
    }
  }

  async findByIsbn(isbn, options = {}) {
    try {
      return await Book.findOne({ where: { isbn }, ...options });
    } catch (error) {
      throw new Error(`Database error fetching book by ISBN: ${error.message}`);
    }
  }

  async findByCategory(categoryId, options = {}) {
    try {
      return await Book.findAll({ where: { categoryId }, ...options });
    } catch (error) {
      throw new Error(`Database error fetching books by category: ${error.message}`);
    }
  }

  async findByEdition(editionId, options = {}) {
    try {
      return await Book.findAll({ where: { editionId }, ...options });
    } catch (error) {
      throw new Error(`Database error fetching books by edition: ${error.message}`);
    }
  }

  async update(id, bookData, options = {}) {
    try {
      const [affectedRows] = await Book.update(bookData, { where: { id }, ...options });
      if (affectedRows > 0) {
        return await Book.findByPk(id);
      }
      return null;
    } catch (error) {
      throw new Error(`Database error updating book: ${error.message}`);
    }
  }

  async delete(id, options = {}) {
    try {
      return await Book.destroy({ where: { id }, ...options });
    } catch (error) {
      throw new Error(`Database error deleting book: ${error.message}`);
    }
  }

  async count(options = {}) {
    try {
      return await Book.count(options);
    } catch (error) {
      throw new Error(`Database error counting books: ${error.message}`);
    }
  }

  async searchByTitle(title, options = {}) {
    try {
      return await Book.findAll({
        where: {
          title: {
            [Op.iLike]: `%${title}%`
          }
        },
        ...options
      });
    } catch (error) {
      throw new Error(`Database error searching books by title: ${error.message}`);
    }
  }
}

export default new BookRepository();
