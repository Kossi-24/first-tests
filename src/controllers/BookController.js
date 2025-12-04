import bookService from '../Services/BookService.js';

class BookController {
  async getBooks(req, res) {
    try {
      const books = await bookService.findAll();
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getBookById(req, res) {
    try {
      const { id } = req.params;
      const book = await bookService.findById(id);
      if (book) {
        res.json(book);
      } else {
        res.status(404).json({ error: 'Book not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createBook(req, res) {
    try {
      const bookData = req.body;
      const book = await bookService.create(bookData);
      res.status(201).json(book);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateBook(req, res) {
    try {
      const { id } = req.params;
      const bookData = req.body;
      const book = await bookService.update(id, bookData);
      res.json(book);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteBook(req, res) {
    try {
      const { id } = req.params;
      const result = await bookService.delete(id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new BookController();
