import { Router } from "express";
import { overview, trackEvent } from "../controllers/analyticsController.js";

const router = Router();

router.get("/overview", overview);
router.post("/event", trackEvent);

export default router;
