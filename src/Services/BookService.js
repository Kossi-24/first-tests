import { Book } from '../models/associations.js';

class BookService {
  async create(bookData) {
    try {
      const book = await Book.create(bookData);
      return book;
    } catch (error) {
      throw new Error(`Error creating book: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const books = await Book.findAll({
        include: ['category', 'edition', 'authors', 'copies', 'reservations'],
      });
      return books;
    } catch (error) {
      throw new Error(`Error fetching books: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      const book = await Book.findByPk(id, {
        include: ['category', 'edition', 'authors', 'copies', 'reservations'],
      });
      return book;
    } catch (error) {
      throw new Error(`Error fetching book: ${error.message}`);
    }
  }

  async update(id, bookData) {
    try {
      const [updated] = await Book.update(bookData, { where: { id } });
      if (updated) {
        const updatedBook = await Book.findByPk(id, {
          include: ['category', 'edition', 'authors', 'copies', 'reservations'],
        });
        return updatedBook;
      }
      throw new Error('Book not found');
    } catch (error) {
      throw new Error(`Error updating book: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      const deleted = await Book.destroy({ where: { id } });
      if (deleted) {
        return { message: 'Book deleted successfully' };
      }
      throw new Error('Book not found');
    } catch (error) {
      throw new Error(`Error deleting book: ${error.message}`);
    }
  }
}

export default new BookService();
