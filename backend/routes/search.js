import { Router } from "express";
import Song from "../models/Song.js";
import Artist from "../models/Artist.js";
import Album from "../models/Album.js";
import Course from "../models/Course.js";

const router = Router();

/**
 * @route GET /api/search
 * @desc Global unified search across Songs, Artists, Albums, Genres, Eras, Courses
 */
router.get("/", async (req, res, next) => {
  try {
    const { q, genre, language, era, year, limit = 20 } = req.query;
    if (!q && !genre && !language && !era && !year) {
      return res.status(400).json({ error: "Query or filter parameter is required" });
    }

    const regex = q ? new RegExp(String(q), "i") : null;

    // Build filter for songs
    const songFilter = { status: "active" };
    if (regex) {
      songFilter.$or = [
        { title: regex },
        { artist: regex },
        { album: regex },
        { genre: regex }
      ];
    }
    if (genre) songFilter.genre = new RegExp(`^${genre}$`, "i");
    if (language) songFilter.language = new RegExp(`^${language}$`, "i");
    if (era) songFilter.era = String(era);
    if (year) songFilter.releaseYear = Number(year);

    const [songs, artists, albums, courses] = await Promise.all([
      Song.find(songFilter).limit(Number(limit)),
      regex ? Artist.find({ name: regex }).limit(5) : [],
      regex ? Album.find({ title: regex }).limit(5) : [],
      regex ? Course.find({ title: regex }).limit(5) : []
    ]);

    res.json({
      success: true,
      data: {
        songs,
        artists,
        albums,
        courses
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;
