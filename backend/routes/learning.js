import { Router } from "express";
import Course from "../models/Course.js";
import Lesson from "../models/Lesson.js";
import Progress from "../models/Progress.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// GET /api/learning/courses
router.get("/courses", async (req, res, next) => {
  try {
    const { instrument, level, q } = req.query;
    const filter = {};

    if (instrument) filter.instrumentOrSubject = new RegExp(`^${instrument}$`, "i");
    if (level) filter.level = new RegExp(`^${level}$`, "i");
    if (q) filter.title = new RegExp(String(q), "i");

    const courses = await Course.find(filter).populate("lessons").sort({ rating: -1 });
    res.json({ success: true, count: courses.length, data: courses });
  } catch (error) {
    next(error);
  }
});

// GET /api/learning/courses/:id
router.get("/courses/:id", async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).populate("lessons");
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json({ success: true, data: course });
  } catch (error) {
    next(error);
  }
});

// POST /api/learning/progress - Update lesson completion & progress
router.post("/progress", requireAuth, async (req, res, next) => {
  try {
    const { courseId, lessonId } = req.body;
    const userId = req.user?.uid;

    let progress = await Progress.findOne({ userId, courseId });
    if (!progress) {
      progress = new Progress({ userId, courseId, completedLessons: [] });
    }

    if (lessonId && !progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
    }

    const course = await Course.findById(courseId).populate("lessons");
    if (course && course.lessons.length > 0) {
      progress.completionPercentage = Math.round(
        (progress.completedLessons.length / course.lessons.length) * 100
      );
      if (progress.completionPercentage >= 100) {
        progress.certificateIssued = true;
        progress.certificateUrl = `/certificates/${userId}_${courseId}.pdf`;
      }
    }

    await progress.save();
    res.json({ success: true, data: progress });
  } catch (error) {
    next(error);
  }
});

export default router;
