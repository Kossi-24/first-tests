import { Op } from 'sequelize';
import { Author } from '../models/associations.js';

class AuthorRepository {
  async create(authorData) {
    try {
      return await Author.create(authorData);
    } catch (error) {
      throw new Error(`Database error creating author: ${error.message}`);
    }
  }

  async findAll(options = {}) {
    try {
      return await Author.findAll(options);
    } catch (error) {
      throw new Error(`Database error fetching authors: ${error.message}`);
    }
  }

  async findById(id, options = {}) {
    try {
      return await Author.findByPk(id, options);
    } catch (error) {
      throw new Error(`Database error fetching author: ${error.message}`);
    }
  }

  async findByName(name, options = {}) {
    try {
      return await Author.findOne({ where: { name }, ...options });
    } catch (error) {
      throw new Error(`Database error fetching author by name: ${error.message}`);
    }
  }

  async update(id, authorData, options = {}) {
    try {
      const [affectedRows] = await Author.update(authorData, { where: { id }, ...options });
      if (affectedRows > 0) {
        return await Author.findByPk(id);
      }
      return null;
    } catch (error) {
      throw new Error(`Database error updating author: ${error.message}`);
    }
  }

  async delete(id, options = {}) {
    try {
      return await Author.destroy({ where: { id }, ...options });
    } catch (error) {
      throw new Error(`Database error deleting author: ${error.message}`);
    }
  }

  async count(options = {}) {
    try {
      return await Author.count(options);
    } catch (error) {
      throw new Error(`Database error counting authors: ${error.message}`);
    }
  }

  async searchByName(name, options = {}) {
    try {
      return await Author.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`
          }
        },
        ...options
      });
    } catch (error) {
      throw new Error(`Database error searching authors by name: ${error.message}`);
    }
  }
}

export default new AuthorRepository();
