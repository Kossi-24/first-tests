import { Exemplaire } from '../models/associations.js';

class ExemplaireService {
  async create(exemplaireData) {
    try {
      const exemplaire = await Exemplaire.create(exemplaireData);
      return exemplaire;
    } catch (error) {
      throw new Error(`Error creating exemplaire: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const exemplaires = await Exemplaire.findAll({ include: ['book', 'emprunts'] });
      return exemplaires;
    } catch (error) {
      throw new Error(`Error fetching exemplaires: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      const exemplaire = await Exemplaire.findByPk(id, { include: ['book', 'emprunts'] });
      return exemplaire;
    } catch (error) {
      throw new Error(`Error fetching exemplaire: ${error.message}`);
    }
  }

  async update(id, exemplaireData) {
    try {
      const [updated] = await Exemplaire.update(exemplaireData, { where: { id } });
      if (updated) {
        const updatedExemplaire = await Exemplaire.findByPk(id, { include: ['book', 'emprunts'] });
        return updatedExemplaire;
      }
      throw new Error('Exemplaire not found');
    } catch (error) {
      throw new Error(`Error updating exemplaire: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      const deleted = await Exemplaire.destroy({ where: { id } });
      if (deleted) {
        return { message: 'Exemplaire deleted successfully' };
      }
      throw new Error('Exemplaire not found');
    } catch (error) {
      throw new Error(`Error deleting exemplaire: ${error.message}`);
    }
  }
}

export default new ExemplaireService();
