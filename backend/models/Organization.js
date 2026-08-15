import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: true },
    domain: { type: String, required: true },
    adminEmail: { type: String, required: true },
    totalLicenses: { type: Number, default: 100 },
    activeEmployees: { type: Number, default: 0 },
    curatedPlaylists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Playlist" }],
    aggregatedAnalytics: {
      totalWellnessHours: { type: Number, default: 0 },
      topGenres: [{ genre: String, percentage: Number }],
      sessionsCompleted: { type: Number, default: 0 }
    }
  },
  { timestamps: true }
);

export default mongoose.models.Organization || mongoose.model("Organization", organizationSchema);
