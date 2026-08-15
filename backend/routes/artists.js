import { Router } from "express";
import Artist from "../models/Artist.js";
import Song from "../models/Song.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// GET /api/artists
router.get("/", async (req, res, next) => {
  try {
    const { genre, q } = req.query;
    const filter = {};
    if (genre) filter.genres = new RegExp(String(genre), "i");
    if (q) filter.name = new RegExp(String(q), "i");

    const artists = await Artist.find(filter).sort({ "stats.monthlyListeners": -1 });
    res.json({ success: true, count: artists.length, data: artists });
  } catch (error) {
    next(error);
  }
});

// GET /api/artists/:id
router.get("/:id", async (req, res, next) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) return res.status(404).json({ error: "Artist not found" });

    // Fetch artist songs
    const songs = await Song.find({ artistId: artist._id });
    res.json({ success: true, data: { artist, songs } });
  } catch (error) {
    next(error);
  }
});

// POST /api/artists (Create/Claim profile)
router.post("/", requireAuth, async (req, res, next) => {
  try {
    const artist = await Artist.create({
      ...req.body,
      userId: req.user?.uid || null
    });
    res.status(201).json({ success: true, data: artist });
  } catch (error) {
    next(error);
  }
});

export default router;
