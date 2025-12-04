import { Amende } from '../models/associations.js';

class AmendeRepository {
  async create(amendeData) {
    try {
      return await Amende.create(amendeData);
    } catch (error) {
      throw new Error(`Database error creating amende: ${error.message}`);
    }
  }

  async findAll(options = {}) {
    try {
      return await Amende.findAll(options);
    } catch (error) {
      throw new Error(`Database error fetching amendes: ${error.message}`);
    }
  }

  async findById(id, options = {}) {
    try {
      return await Amende.findByPk(id, options);
    } catch (error) {
      throw new Error(`Database error fetching amende: ${error.message}`);
    }
  }

  async findByUser(userId, options = {}) {
    try {
      return await Amende.findAll({ where: { userId }, ...options });
    } catch (error) {
      throw new Error(`Database error fetching amendes by user: ${error.message}`);
    }
  }

  async findByLoan(loanId, options = {}) {
    try {
      return await Amende.findAll({ where: { loanId }, ...options });
    } catch (error) {
      throw new Error(`Database error fetching amendes by loan: ${error.message}`);
    }
  }

  async findByStatus(status, options = {}) {
    try {
      return await Amende.findAll({ where: { status }, ...options });
    } catch (error) {
      throw new Error(`Database error fetching amendes by status: ${error.message}`);
    }
  }

  async findUnpaidByUser(userId, options = {}) {
    try {
      return await Amende.findAll({
        where: {
          userId,
          status: 'UNPAID'
        },
        ...options
      });
    } catch (error) {
      throw new Error(`Database error fetching unpaid amendes by user: ${error.message}`);
    }
  }

  async update(id, amendeData, options = {}) {
    try {
      const [affectedRows] = await Amende.update(amendeData, { where: { id }, ...options });
      if (affectedRows > 0) {
        return await Amende.findByPk(id);
      }
      return null;
    } catch (error) {
      throw new Error(`Database error updating amende: ${error.message}`);
    }
  }

  async delete(id, options = {}) {
    try {
      return await Amende.destroy({ where: { id }, ...options });
    } catch (error) {
      throw new Error(`Database error deleting amende: ${error.message}`);
    }
  }

  async count(options = {}) {
    try {
      return await Amende.count(options);
    } catch (error) {
      throw new Error(`Database error counting amendes: ${error.message}`);
    }
  }

  async countByUser(userId, options = {}) {
    try {
      return await Amende.count({ where: { userId }, ...options });
    } catch (error) {
      throw new Error(`Database error counting amendes by user: ${error.message}`);
    }
  }

  async getTotalAmountByUser(userId, options = {}) {
    try {
      const result = await Amende.findAll({
        where: { userId },
        attributes: [
          [Amende.sequelize.fn('SUM', Amende.sequelize.col('amount')), 'total']
        ],
        raw: true,
        ...options
      });
      return result[0]?.total || 0;
    } catch (error) {
      throw new Error(`Database error calculating total amount by user: ${error.message}`);
    }
  }
}

export default new AmendeRepository();
