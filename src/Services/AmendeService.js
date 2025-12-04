import { Amende } from '../models/associations.js';

class AmendeService {
  async create(amendeData) {
    try {
      const amende = await Amende.create(amendeData);
      return amende;
    } catch (error) {
      throw new Error(`Error creating amende: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const amendes = await Amende.findAll({ include: ['user', 'loan'] });
      return amendes;
    } catch (error) {
      throw new Error(`Error fetching amendes: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      const amende = await Amende.findByPk(id, { include: ['user', 'loan'] });
      return amende;
    } catch (error) {
      throw new Error(`Error fetching amende: ${error.message}`);
    }
  }

  async update(id, amendeData) {
    try {
      const [updated] = await Amende.update(amendeData, { where: { id } });
      if (updated) {
        const updatedAmende = await Amende.findByPk(id, { include: ['user', 'loan'] });
        return updatedAmende;
      }
      throw new Error('Amende not found');
    } catch (error) {
      throw new Error(`Error updating amende: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      const deleted = await Amende.destroy({ where: { id } });
      if (deleted) {
        return { message: 'Amende deleted successfully' };
      }
      throw new Error('Amende not found');
    } catch (error) {
      throw new Error(`Error deleting amende: ${error.message}`);
    }
  }
}

export default new AmendeService();
