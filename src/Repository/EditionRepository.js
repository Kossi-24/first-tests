import { Op } from 'sequelize';
import { Edition } from '../models/associations.js';

class EditionRepository {
  async create(editionData) {
    try {
      return await Edition.create(editionData);
    } catch (error) {
      throw new Error(`Database error creating edition: ${error.message}`);
    }
  }

  async findAll(options = {}) {
    try {
      return await Edition.findAll(options);
    } catch (error) {
      throw new Error(`Database error fetching editions: ${error.message}`);
    }
  }

  async findById(id, options = {}) {
    try {
      return await Edition.findByPk(id, options);
    } catch (error) {
      throw new Error(`Database error fetching edition: ${error.message}`);
    }
  }

  async findByName(name, options = {}) {
    try {
      return await Edition.findOne({ where: { name }, ...options });
    } catch (error) {
      throw new Error(`Database error fetching edition by name: ${error.message}`);
    }
  }

  async update(id, editionData, options = {}) {
    try {
      const [affectedRows] = await Edition.update(editionData, { where: { id }, ...options });
      if (affectedRows > 0) {
        return await Edition.findByPk(id);
      }
      return null;
    } catch (error) {
      throw new Error(`Database error updating edition: ${error.message}`);
    }
  }

  async delete(id, options = {}) {
    try {
      return await Edition.destroy({ where: { id }, ...options });
    } catch (error) {
      throw new Error(`Database error deleting edition: ${error.message}`);
    }
  }

  async count(options = {}) {
    try {
      return await Edition.count(options);
    } catch (error) {
      throw new Error(`Database error counting editions: ${error.message}`);
    }
  }

  async searchByName(name, options = {}) {
    try {
      return await Edition.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`
          }
        },
        ...options
      });
    } catch (error) {
      throw new Error(`Database error searching editions by name: ${error.message}`);
    }
  }
}

export default new EditionRepository();
