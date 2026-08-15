import { Router } from "express";
import Kirtankar from "../models/Kirtankar.js";
import Song from "../models/Song.js";

const router = Router();

// GET /api/kirtankars
router.get("/", async (req, res, next) => {
  try {
    const { primaryGod, templeOrTradition, category, q } = req.query;
    const filter = {};

    if (primaryGod) filter.primaryGod = new RegExp(String(primaryGod), "i");
    if (templeOrTradition) filter.templeOrTradition = new RegExp(String(templeOrTradition), "i");
    if (category) filter.categories = new RegExp(String(category), "i");
    if (q) filter.name = new RegExp(String(q), "i");

    const creators = await Kirtankar.find(filter).sort({ "stats.totalListeners": -1 });
    res.json({ success: true, count: creators.length, data: creators });
  } catch (error) {
    next(error);
  }
});

// GET /api/kirtankars/:id
router.get("/:id", async (req, res, next) => {
  try {
    const kirtankar = await Kirtankar.findById(req.params.id);
    if (!kirtankar) return res.status(404).json({ error: "Kirtankar not found" });

    const tracks = await Song.find({ kirtankarId: kirtankar._id });
    res.json({ success: true, data: { kirtankar, tracks } });
  } catch (error) {
    next(error);
  }
});

export default router;
