import { Router } from "express";
import Organization from "../models/Organization.js";
import Playlist from "../models/Playlist.js";

const router = Router();

// GET /api/wellness/organization/:id - Privacy-preserved aggregated organization analytics
router.get("/organization/:id", async (req, res, next) => {
  try {
    const org = await Organization.findById(req.params.id).populate("curatedPlaylists");
    if (!org) return res.status(404).json({ error: "Organization not found" });

    // Explicitly return ONLY aggregated analytics, strictly omitting individual user/employee records
    res.json({
      success: true,
      data: {
        organizationName: org.name,
        totalLicenses: org.totalLicenses,
        activeEmployees: org.activeEmployees,
        aggregatedAnalytics: org.aggregatedAnalytics,
        playlists: org.curatedPlaylists
      }
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/wellness/playlists - Get corporate wellness playlists
router.get("/playlists", async (req, res, next) => {
  try {
    const playlists = await Playlist.find({ isCorporate: true });
    res.json({ success: true, count: playlists.length, data: playlists });
  } catch (error) {
    next(error);
  }
});

export default router;
