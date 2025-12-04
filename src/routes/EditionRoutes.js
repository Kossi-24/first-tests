import express from 'express';
import editionController from '../controllers/EditionController.js';
import { authenticate } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/RoleMiddleware.js";

const router = express.Router();

router.get("/", authenticate, editionController.getEditions);
router.post("/", authenticate, authorizeRoles("ADMIN"), editionController.createEdition);
router.put("/:id", authenticate, authorizeRoles("ADMIN"), editionController.updateEdition);
router.delete("/:id", authenticate, authorizeRoles("ADMIN"), editionController.deleteEdition);

export default router;
