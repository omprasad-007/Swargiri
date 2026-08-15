import express from "express";
import { AIAssistantService } from "../services/aiAssistantService.js";

const router = express.Router();

/**
 * @route POST /api/ai/assistant
 * @desc Process natural language music requests safely
 */
router.post("/assistant", async (req, res, next) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const result = await AIAssistantService.processNaturalQuery(prompt);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
});

export default router;
