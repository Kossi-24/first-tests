import { Category } from '../models/associations.js';

class CategoryService {
  async create(categoryData) {
    try {
      const category = await Category.create(categoryData);
      return category;
    } catch (error) {
      throw new Error(`Error creating category: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const categories = await Category.findAll({ include: ['books'] });
      return categories;
    } catch (error) {
      throw new Error(`Error fetching categories: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      const category = await Category.findByPk(id, { include: ['books'] });
      return category;
    } catch (error) {
      throw new Error(`Error fetching category: ${error.message}`);
    }
  }

  async update(id, categoryData) {
    try {
      const [updated] = await Category.update(categoryData, { where: { id } });
      if (updated) {
        const updatedCategory = await Category.findByPk(id, { include: ['books'] });
        return updatedCategory;
      }
      throw new Error('Category not found');
    } catch (error) {
      throw new Error(`Error updating category: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      const deleted = await Category.destroy({ where: { id } });
      if (deleted) {
        return { message: 'Category deleted successfully' };
      }
      throw new Error('Category not found');
    } catch (error) {
      throw new Error(`Error deleting category: ${error.message}`);
    }
  }
}

export default new CategoryService();
