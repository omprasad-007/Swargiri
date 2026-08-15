import express from "express";
import { RecommendationService } from "../services/recommendationService.js";

const router = express.Router();

/**
 * @route GET /api/recommendations
 * @desc Get rule-based song recommendations
 */
router.get("/", async (req, res, next) => {
  try {
    const { userId, genres, languages, mood, activity, limit } = req.query;

    const parsedGenres = genres ? String(genres).split(",") : [];
    const parsedLanguages = languages ? String(languages).split(",") : [];

    const result = await RecommendationService.getRecommendations({
      userId,
      preferredGenres: parsedGenres,
      preferredLanguages: parsedLanguages,
      mood: mood ? String(mood) : undefined,
      activity: activity ? String(activity) : undefined,
      limit: limit ? Number(limit) : 10
    });

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
});

export default router;
