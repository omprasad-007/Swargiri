import mongoose from "mongoose";

const artistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: true },
    bio: { type: String, default: "" },
    avatar: { type: String, default: "" },
    coverImage: { type: String, default: "" },
    genres: [{ type: String }],
    languages: [{ type: String }],
    verified: { type: Boolean, default: true },
    socialLinks: {
      spotify: { type: String, default: "" },
      youtube: { type: String, default: "" },
      instagram: { type: String, default: "" },
      website: { type: String, default: "" }
    },
    stats: {
      monthlyListeners: { type: Number, default: 12500 },
      totalPlays: { type: Number, default: 85000 },
      followersCount: { type: Number, default: 4200 },
      savesCount: { type: Number, default: 1800 }
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }
  },
  { timestamps: true }
);

export default mongoose.models.Artist || mongoose.model("Artist", artistSchema);
