import express from 'express';
import userController from '../controllers/UserController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/RoleMiddleware.js';

const router = express.Router();

router.get('/', authenticate, authorizeRoles('ADMIN', 'LIBRARIAN'), userController.getUsers);
router.get('/:id', authenticate, authorizeRoles('ADMIN', 'LIBRARIAN'), userController.getUserById);
router.post('/', authenticate, authorizeRoles('ADMIN', 'LIBRARIAN'), userController.createUser);
router.put('/:id', authenticate, authorizeRoles('ADMIN', 'LIBRARIAN'), userController.updateUser);
router.delete('/:id', authenticate, authorizeRoles('ADMIN', 'LIBRARIAN'), userController.deleteUser);

export default router;
