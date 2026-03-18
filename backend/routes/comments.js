import { Router } from "express";
import { buildCrudController } from "../controllers/crud.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
const controller = buildCrudController("comments");

router.get("/", controller.list);
router.post("/", requireAuth, controller.create);
router.get("/:id", controller.getById);
router.delete("/:id", requireAuth, controller.remove);

export default router;
