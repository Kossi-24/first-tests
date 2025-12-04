import { Op } from 'sequelize';
import { Emprunt } from '../models/associations.js';

class EmpruntRepository {
  async create(empruntData) {
    try {
      return await Emprunt.create(empruntData);
    } catch (error) {
      throw new Error(`Database error creating emprunt: ${error.message}`);
    }
  }

  async findAll(options = {}) {
    try {
      return await Emprunt.findAll(options);
    } catch (error) {
      throw new Error(`Database error fetching emprunts: ${error.message}`);
    }
  }

  async findById(id, options = {}) {
    try {
      return await Emprunt.findByPk(id, options);
    } catch (error) {
      throw new Error(`Database error fetching emprunt: ${error.message}`);
    }
  }

  async findByUser(userId, options = {}) {
    try {
      return await Emprunt.findAll({ where: { userId }, ...options });
    } catch (error) {
      throw new Error(`Database error fetching emprunts by user: ${error.message}`);
    }
  }

  async findByCopy(copyId, options = {}) {
    try {
      return await Emprunt.findAll({ where: { copyId }, ...options });
    } catch (error) {
      throw new Error(`Database error fetching emprunts by copy: ${error.message}`);
    }
  }

  async findActiveByUser(userId, options = {}) {
    try {
      return await Emprunt.findAll({
        where: {
          userId,
          returnDate: null
        },
        ...options
      });
    } catch (error) {
      throw new Error(`Database error fetching active emprunts by user: ${error.message}`);
    }
  }

  async findOverdue(options = {}) {
    try {
      return await Emprunt.findAll({
        where: {
          returnDate: null,
          dueDate: {
            [Op.lt]: new Date()
          }
        },
        ...options
      });
    } catch (error) {
      throw new Error(`Database error fetching overdue emprunts: ${error.message}`);
    }
  }

  async update(id, empruntData, options = {}) {
    try {
      const [affectedRows] = await Emprunt.update(empruntData, { where: { id }, ...options });
      if (affectedRows > 0) {
        return await Emprunt.findByPk(id);
      }
      return null;
    } catch (error) {
      throw new Error(`Database error updating emprunt: ${error.message}`);
    }
  }

  async delete(id, options = {}) {
    try {
      return await Emprunt.destroy({ where: { id }, ...options });
    } catch (error) {
      throw new Error(`Database error deleting emprunt: ${error.message}`);
    }
  }

  async count(options = {}) {
    try {
      return await Emprunt.count(options);
    } catch (error) {
      throw new Error(`Database error counting emprunts: ${error.message}`);
    }
  }

  async countActiveByUser(userId, options = {}) {
    try {
      return await Emprunt.count({
        where: {
          userId,
          returnDate: null
        },
        ...options
      });
    } catch (error) {
      throw new Error(`Database error counting active emprunts by user: ${error.message}`);
    }
  }
}

export default new EmpruntRepository();
