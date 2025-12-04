import express from 'express';
import reservationController from '../controllers/ReservationController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authenticate, reservationController.getReservations);
router.get('/:id', authenticate, reservationController.getReservationById);
router.post('/', authenticate, reservationController.createReservation);
router.put('/:id', authenticate, reservationController.updateReservation);
router.delete('/:id', authenticate, reservationController.deleteReservation);

export default router;
