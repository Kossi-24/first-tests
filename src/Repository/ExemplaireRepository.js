import { Exemplaire } from '../models/associations.js';

class ExemplaireRepository {
  async create(exemplaireData) {
    try {
      return await Exemplaire.create(exemplaireData);
    } catch (error) {
      throw new Error(`Database error creating exemplaire: ${error.message}`);
    }
  }

  async findAll(options = {}) {
    try {
      return await Exemplaire.findAll(options);
    } catch (error) {
      throw new Error(`Database error fetching exemplaires: ${error.message}`);
    }
  }

  async findById(id, options = {}) {
    try {
      return await Exemplaire.findByPk(id, options);
    } catch (error) {
      throw new Error(`Database error fetching exemplaire: ${error.message}`);
    }
  }

  async findByBarcode(barcode, options = {}) {
    try {
      return await Exemplaire.findOne({ where: { barcode }, ...options });
    } catch (error) {
      throw new Error(`Database error fetching exemplaire by barcode: ${error.message}`);
    }
  }

  async findByBook(bookId, options = {}) {
    try {
      return await Exemplaire.findAll({ where: { bookId }, ...options });
    } catch (error) {
      throw new Error(`Database error fetching exemplaires by book: ${error.message}`);
    }
  }

  async findByStatus(status, options = {}) {
    try {
      return await Exemplaire.findAll({ where: { status }, ...options });
    } catch (error) {
      throw new Error(`Database error fetching exemplaires by status: ${error.message}`);
    }
  }

  async update(id, exemplaireData, options = {}) {
    try {
      const [affectedRows] = await Exemplaire.update(exemplaireData, { where: { id }, ...options });
      if (affectedRows > 0) {
        return await Exemplaire.findByPk(id);
      }
      return null;
    } catch (error) {
      throw new Error(`Database error updating exemplaire: ${error.message}`);
    }
  }

  async delete(id, options = {}) {
    try {
      return await Exemplaire.destroy({ where: { id }, ...options });
    } catch (error) {
      throw new Error(`Database error deleting exemplaire: ${error.message}`);
    }
  }

  async count(options = {}) {
    try {
      return await Exemplaire.count(options);
    } catch (error) {
      throw new Error(`Database error counting exemplaires: ${error.message}`);
    }
  }

  async countByStatus(status, options = {}) {
    try {
      return await Exemplaire.count({ where: { status }, ...options });
    } catch (error) {
      throw new Error(`Database error counting exemplaires by status: ${error.message}`);
    }
  }
}

export default new ExemplaireRepository();
