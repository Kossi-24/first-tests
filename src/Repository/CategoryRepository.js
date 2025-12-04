import { Op } from 'sequelize';
import { Category } from '../models/associations.js';

class CategoryRepository {
  async create(categoryData) {
    try {
      return await Category.create(categoryData);
    } catch (error) {
      throw new Error(`Database error creating category: ${error.message}`);
    }
  }

  async findAll(options = {}) {
    try {
      return await Category.findAll(options);
    } catch (error) {
      throw new Error(`Database error fetching categories: ${error.message}`);
    }
  }

  async findById(id, options = {}) {
    try {
      return await Category.findByPk(id, options);
    } catch (error) {
      throw new Error(`Database error fetching category: ${error.message}`);
    }
  }

  async findByName(name, options = {}) {
    try {
      return await Category.findOne({ where: { name }, ...options });
    } catch (error) {
      throw new Error(`Database error fetching category by name: ${error.message}`);
    }
  }

  async update(id, categoryData, options = {}) {
    try {
      const [affectedRows] = await Category.update(categoryData, { where: { id }, ...options });
      if (affectedRows > 0) {
        return await Category.findByPk(id);
      }
      return null;
    } catch (error) {
      throw new Error(`Database error updating category: ${error.message}`);
    }
  }

  async delete(id, options = {}) {
    try {
      return await Category.destroy({ where: { id }, ...options });
    } catch (error) {
      throw new Error(`Database error deleting category: ${error.message}`);
    }
  }

  async count(options = {}) {
    try {
      return await Category.count(options);
    } catch (error) {
      throw new Error(`Database error counting categories: ${error.message}`);
    }
  }

  async searchByName(name, options = {}) {
    try {
      return await Category.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`
          }
        },
        ...options
      });
    } catch (error) {
      throw new Error(`Database error searching categories by name: ${error.message}`);
    }
  }
}

export default new CategoryRepository();
