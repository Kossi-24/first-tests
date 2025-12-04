import express from 'express';
import authorController from '../controllers/AuthorController.js';
import { authenticate } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/RoleMiddleware.js";
const router = express.Router();


router.get("/", authenticate, authorController.getAuthors);
router.get("/:id", authenticate, authorController.getAuthorById);

router.post("/", authenticate, authorizeRoles("ADMIN"), authorController.createAuthor);
router.put("/:id", authenticate, authorizeRoles("ADMIN"), authorController.updateAuthor);
router.delete("/:id", authenticate, authorizeRoles("ADMIN"), authorController.deleteAuthor);

export default router;
