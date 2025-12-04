import categoryService from '../Services/CategoryService.js';

class CategoryController {
  async getCategories(req, res) {
    try {
      const categories = await categoryService.findAll();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getCategoryById(req, res) {
    try {
      const { id } = req.params;
      const category = await categoryService.findById(id);
      if (category) {
        res.json(category);
      } else {
        res.status(404).json({ error: 'Category not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createCategory(req, res) {
    try {
      const categoryData = req.body;
      const category = await categoryService.create(categoryData);
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const categoryData = req.body;
      const category = await categoryService.update(id, categoryData);
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      const result = await categoryService.delete(id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new CategoryController();
