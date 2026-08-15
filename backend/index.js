import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";

import songRoutes from "./routes/songs.js";
import playlistRoutes from "./routes/playlists.js";
import courseRoutes from "./routes/courses.js";
import lessonRoutes from "./routes/lessons.js";
import eventRoutes from "./routes/events.js";
import commentRoutes from "./routes/comments.js";
import analyticsRoutes from "./routes/analytics.js";
import authRoutes from "./routes/auth.js";
import aiRoutes from "./routes/ai.js";
import recommendationRoutes from "./routes/recommendations.js";
import artistRoutes from "./routes/artists.js";
import kirtankarRoutes from "./routes/kirtankars.js";
import learningRoutes from "./routes/learning.js";
import wellnessRoutes from "./routes/wellness.js";
import searchRoutes from "./routes/search.js";

import { errorHandler } from "./middleware/error.js";
import { getFirebaseApp } from "./config/firebase.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/swargiri";

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.warn("MongoDB connection warning:", err.message));

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(cors());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan("dev"));

// Initialize Firebase
const firebaseApp = getFirebaseApp();
if (!firebaseApp) {
  console.warn("Firebase is not configured. Set FIREBASE_* env values.");
}

// Health Route
app.get("/", (req, res) => {
  res.json({
    name: "Swargiri Universal Music Ecosystem API",
    status: "online",
    version: "2.0.0"
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/kirtankars", kirtankarRoutes);
app.use("/api/learning", learningRoutes);
app.use("/api/wellness", wellnessRoutes);
app.use("/api/search", searchRoutes);

// Error Handler
app.use(errorHandler);

// Start Server
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Swargiri Backend API running on port ${PORT}`);
  });
}

export default app;
