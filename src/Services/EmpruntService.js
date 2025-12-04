import { Emprunt } from '../models/associations.js';

class EmpruntService {
  async create(empruntData) {
    try {
      const emprunt = await Emprunt.create(empruntData);
      return emprunt;
    } catch (error) {
      throw new Error(`Error creating emprunt: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const emprunts = await Emprunt.findAll({ include: ['copy', 'user', 'amendes'] });
      return emprunts;
    } catch (error) {
      throw new Error(`Error fetching emprunts: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      const emprunt = await Emprunt.findByPk(id, { include: ['copy', 'user', 'amendes'] });
      return emprunt;
    } catch (error) {
      throw new Error(`Error fetching emprunt: ${error.message}`);
    }
  }

  async update(id, empruntData) {
    try {
      const [updated] = await Emprunt.update(empruntData, { where: { id } });
      if (updated) {
        const updatedEmprunt = await Emprunt.findByPk(id, { include: ['copy', 'user', 'amendes'] });
        return updatedEmprunt;
      }
      throw new Error('Emprunt not found');
    } catch (error) {
      throw new Error(`Error updating emprunt: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      const deleted = await Emprunt.destroy({ where: { id } });
      if (deleted) {
        return { message: 'Emprunt deleted successfully' };
      }
      throw new Error('Emprunt not found');
    } catch (error) {
      throw new Error(`Error deleting emprunt: ${error.message}`);
    }
  }
}

export default new EmpruntService();
