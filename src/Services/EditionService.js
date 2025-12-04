import { Edition } from '../models/associations.js';

class EditionService {
  async create(editionData) {
    try {
      const edition = await Edition.create(editionData);
      return edition;
    } catch (error) {
      throw new Error(`Error creating edition: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const editions = await Edition.findAll({ include: ['books'] });
      return editions;
    } catch (error) {
      throw new Error(`Error fetching editions: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      const edition = await Edition.findByPk(id, { include: ['books'] });
      return edition;
    } catch (error) {
      throw new Error(`Error fetching edition: ${error.message}`);
    }
  }

  async update(id, editionData) {
    try {
      const [updated] = await Edition.update(editionData, { where: { id } });
      if (updated) {
        const updatedEdition = await Edition.findByPk(id, { include: ['books'] });
        return updatedEdition;
      }
      throw new Error('Edition not found');
    } catch (error) {
      throw new Error(`Error updating edition: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      const deleted = await Edition.destroy({ where: { id } });
      if (deleted) {
        return { message: 'Edition deleted successfully' };
      }
      throw new Error('Edition not found');
    } catch (error) {
      throw new Error(`Error deleting edition: ${error.message}`);
    }
  }
}

export default new EditionService();
