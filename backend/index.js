import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import songRoutes from "./routes/songs.js";
import playlistRoutes from "./routes/playlists.js";
import courseRoutes from "./routes/courses.js";
import lessonRoutes from "./routes/lessons.js";
import eventRoutes from "./routes/events.js";
import commentRoutes from "./routes/comments.js";
import analyticsRoutes from "./routes/analytics.js";
import authRoutes from "./routes/auth.js";
import { errorHandler } from "./middleware/error.js";
import { getFirebaseApp } from "./config/firebase.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Initialize Firebase
const firebaseApp = getFirebaseApp();
if (!firebaseApp) {
  console.warn("Firebase is not configured. Set FIREBASE_* env values.");
}

// Health Route
app.get("/", (req, res) => {
  res.send("Swargiri Backend API is running...");
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

// Error Handler
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
