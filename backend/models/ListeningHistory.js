import mongoose from "mongoose";

const listeningHistorySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    songId: { type: mongoose.Schema.Types.ObjectId, ref: "Song", required: true },
    playedDurationSeconds: { type: Number, default: 0 },
    skipped: { type: Boolean, default: false },
    completed: { type: Boolean, default: true },
    playedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.models.ListeningHistory || mongoose.model("ListeningHistory", listeningHistorySchema);
