import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    artistOrHost: { type: String, required: true },
    artistId: { type: mongoose.Schema.Types.ObjectId, ref: "Artist", default: null },
    kirtankarId: { type: mongoose.Schema.Types.ObjectId, ref: "Kirtankar", default: null },
    scheduledAt: { type: Date, required: true },
    streamProvider: { type: String, enum: ["YouTubeLive", "HLS", "Twitch", "CustomEmbed"], default: "YouTubeLive" },
    streamUrl: { type: String, default: "" },
    bannerImage: { type: String, default: "" },
    category: { type: String, default: "Live Performance" },
    status: { type: String, enum: ["upcoming", "live", "ended"], default: "upcoming" },
    remindersCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.models.Event || mongoose.model("Event", eventSchema);
