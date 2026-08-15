import { Router } from "express";
import Event from "../models/Event.js";

const router = Router();

// GET /api/events
router.get("/", async (req, res, next) => {
  try {
    const { status = "upcoming" } = req.query;
    const events = await Event.find({ status }).sort({ scheduledAt: 1 });
    res.json({ success: true, count: events.length, data: events });
  } catch (error) {
    next(error);
  }
});

// POST /api/events/:id/reminder
router.post("/:id/reminder", async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { $inc: { remindersCount: 1 } },
      { new: true }
    );
    res.json({ success: true, message: "Reminder set successfully", data: event });
  } catch (error) {
    next(error);
  }
});

export default router;
