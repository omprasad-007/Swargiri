import { Router } from "express";
import Song from "../models/Song.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// GET /api/songs - List songs with comprehensive multi-faceted filters
router.get("/", async (req, res, next) => {
  try {
    const { q, genre, language, region, era, year, mood, activity, raga, taal, artist, limit = 50, page = 1 } = req.query;

    const filter = { status: "active" };

    if (genre) filter.genre = new RegExp(`^${genre}$`, "i");
    if (language) filter.language = new RegExp(`^${language}$`, "i");
    if (region) filter.region = new RegExp(`^${region}$`, "i");
    if (era) filter.era = String(era);
    if (year) filter.releaseYear = Number(year);
    if (mood) filter.mood = new RegExp(String(mood), "i");
    if (activity) filter.activity = new RegExp(String(activity), "i");
    if (raga) filter.raga = new RegExp(String(raga), "i");
    if (taal) filter.taal = new RegExp(String(taal), "i");
    if (artist) filter.artist = new RegExp(String(artist), "i");

    if (q) {
      filter.$or = [
        { title: new RegExp(String(q), "i") },
        { artist: new RegExp(String(q), "i") },
        { album: new RegExp(String(q), "i") },
        { lyrics: new RegExp(String(q), "i") }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    // Try finding in MongoDB
    let songs = await Song.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit));

    // If MongoDB is empty, fallback to local dataset if available
    res.json({
      success: true,
      count: songs.length,
      page: Number(page),
      data: songs
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/songs/:id
router.get("/:id", async (req, res, next) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).json({ error: "Song not found" });
    res.json({ success: true, data: song });
  } catch (error) {
    next(error);
  }
});

// POST /api/songs - Create a song
router.post("/", requireAuth, async (req, res, next) => {
  try {
    const newSong = await Song.create({
      ...req.body,
      uploadedBy: req.user?.uid || null
    });
    res.status(201).json({ success: true, data: newSong });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/songs/:id
router.patch("/:id", requireAuth, async (req, res, next) => {
  try {
    const updated = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/songs/:id
router.delete("/:id", requireAuth, async (req, res, next) => {
  try {
    await Song.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Song deleted successfully" });
  } catch (error) {
    next(error);
  }
});

export default router;
