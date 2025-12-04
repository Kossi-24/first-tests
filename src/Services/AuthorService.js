import { Author } from '../models/associations.js';

class AuthorService {
  async create(authorData) {
    try {
      const author = await Author.create(authorData);
      return author;
    } catch (error) {
      throw new Error(`Error creating author: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const authors = await Author.findAll({ include: ['books'] });
      return authors;
    } catch (error) {
      throw new Error(`Error fetching authors: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      const author = await Author.findByPk(id, { include: ['books'] });
      return author;
    } catch (error) {
      throw new Error(`Error fetching author: ${error.message}`);
    }
  }

  async update(id, authorData) {
    try {
      const [updated] = await Author.update(authorData, { where: { id } });
      if (updated) {
        const updatedAuthor = await Author.findByPk(id, { include: ['books'] });
        return updatedAuthor;
      }
      throw new Error('Author not found');
    } catch (error) {
      throw new Error(`Error updating author: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      const deleted = await Author.destroy({ where: { id } });
      if (deleted) {
        return { message: 'Author deleted successfully' };
      }
      throw new Error('Author not found');
    } catch (error) {
      throw new Error(`Error deleting author: ${error.message}`);
    }
  }
}

export default new AuthorService();
