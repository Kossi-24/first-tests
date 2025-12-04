import userRoutes from './userRoutes.js';
import bookRoutes from './bookRoutes.js';
import authorRoutes from './authorRoutes.js';
import exemplaireRoutes from './exemplaireRoutes.js';
import empruntRoutes from './empruntRoutes.js';
import reservationRoutes from './reservationRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import editionRoutes from './EditionRoutes.js';
import amendeRoutes from './amendeRoutes.js';

const setupRoutes = (app) => {
  app.use('/api/users', userRoutes);
  app.use('/api/books', bookRoutes);
  app.use('/api/authors', authorRoutes);
  app.use('/api/exemplaires', exemplaireRoutes);
  app.use('/api/emprunts', empruntRoutes);
  app.use('/api/reservations', reservationRoutes);
  app.use('/api/categories', categoryRoutes);
  app.use('/api/editions', editionRoutes);
  app.use('/api/amendes', amendeRoutes);
 // app.use('/api/book-authors', bookAuthorRoutes);
};

export default setupRoutes;
