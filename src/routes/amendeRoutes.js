import express from 'express';
import amendeController from '../controllers/AmendeController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authenticate, amendeController.getAmendes);
router.get('/:id', authenticate, amendeController.getAmendeById);
router.post('/', authenticate, amendeController.createAmende);
router.put('/:id', authenticate, amendeController.updateAmende);
router.delete('/:id', authenticate, amendeController.deleteAmende);
export default router;
