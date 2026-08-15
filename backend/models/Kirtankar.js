import mongoose from "mongoose";

const kirtankarSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: true },
    bio: { type: String, default: "" },
    avatar: { type: String, default: "" },
    templeOrTradition: { type: String, default: "Varkari Sampradaya", index: true },
    primaryGod: { type: String, default: "Vitthal", index: true },
    categories: [{
      type: String,
      enum: ["Bhajan", "Kirtan", "Abhang", "Aarti", "Mantra", "Pravachan"]
    }],
    ragas: [{ type: String }],
    taals: [{ type: String }],
    languages: [{ type: String }],
    region: { type: String, default: "Maharashtra" },
    verified: { type: Boolean, default: true },
    stats: {
      totalDiscourses: { type: Number, default: 48 },
      totalListeners: { type: Number, default: 24000 },
      followersCount: { type: Number, default: 6800 }
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }
  },
  { timestamps: true }
);

export default mongoose.models.Kirtankar || mongoose.model("Kirtankar", kirtankarSchema);
