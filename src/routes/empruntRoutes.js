import express from 'express';
import empruntController from '../controllers/EmpruntController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authenticate, empruntController.getEmprunts);
router.get('/:id', authenticate,empruntController.getEmpruntById);
router.post('/', authenticate,empruntController.createEmprunt);
router.put('/:id', authenticate,empruntController.updateEmprunt);
router.delete('/:id', authenticate,empruntController.deleteEmprunt);

export default router;
