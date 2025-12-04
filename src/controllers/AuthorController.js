import authorService from '../Services/AuthorService.js';

class AuthorController {
  async getAuthors(req, res) {
    try {
      const authors = await authorService.findAll();
      res.json(authors);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAuthorById(req, res) {
    try {
      const { id } = req.params;
      const author = await authorService.findById(id);
      if (author) {
        res.json(author);
      } else {
        res.status(404).json({ error: 'Author not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createAuthor(req, res) {
    try {
      const authorData = req.body;
      const author = await authorService.create(authorData);
      res.status(201).json(author);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateAuthor(req, res) {
    try {
      const { id } = req.params;
      const authorData = req.body;
      const author = await authorService.update(id, authorData);
      res.json(author);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteAuthor(req, res) {
    try {
      const { id } = req.params;
      const result = await authorService.delete(id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new AuthorController();
