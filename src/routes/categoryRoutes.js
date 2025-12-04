import express from 'express';
import categoryController from '../controllers/CategoryController.js';
import { authenticate } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/RoleMiddleware.js";
const router = express.Router();


router.get("/", authenticate, categoryController.getCategories);
router.get("/:id", authenticate, categoryController.getCategoryById);

router.post("/", authenticate, authorizeRoles("ADMIN"), categoryController.createCategory);
router.put("/:id", authenticate, authorizeRoles("ADMIN"), categoryController.updateCategory);
router.delete("/:id", authenticate, authorizeRoles("ADMIN"), categoryController.deleteCategory);

export default router;
