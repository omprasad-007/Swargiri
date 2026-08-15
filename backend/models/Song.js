import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    artist: { type: String, required: true, index: true },
    artistId: { type: mongoose.Schema.Types.ObjectId, ref: "Artist", default: null },
    kirtankarId: { type: mongoose.Schema.Types.ObjectId, ref: "Kirtankar", default: null },
    album: { type: String, default: "Single" },
    albumId: { type: mongoose.Schema.Types.ObjectId, ref: "Album", default: null },
    genre: { 
      type: String, 
      required: true, 
      enum: [
        "Devotional", "Indian Classical", "International", "Folk", "Pop", "Rock", 
        "Hip-hop", "Rap", "Jazz", "Blues", "Electronic", "Instrumental", 
        "Meditation", "Lo-fi", "Bollywood", "Regional", "Independent", "Historical"
      ],
      index: true 
    },
    language: { type: String, default: "Hindi", index: true },
    region: { type: String, default: "India" },
    country: { type: String, default: "India" },
    era: { 
      type: String, 
      enum: ["1950s", "1960s", "1970s", "1980s", "1990s", "2000s", "2010s", "2020s"],
      default: "2020s",
      index: true 
    },
    releaseYear: { type: Number, default: 2024 },
    mood: { type: String, default: "Peaceful", index: true },
    activity: { type: String, default: "Relaxing" },
    raga: { type: String, default: "" },
    taal: { type: String, default: "" },
    tempo: { type: String, default: "Medium" },
    instruments: [{ type: String }],
    lyrics: { type: String, default: "" },
    audioUrl: { type: String, required: true },
    videoUrl: { type: String, default: "" },
    coverImage: { type: String, default: "" },
    duration: { type: Number, default: 240 }, // duration in seconds
    copyrightStatus: { 
      type: String, 
      enum: ["Public Domain", "Licensed", "Creator Authorized", "Creative Commons"],
      default: "Creator Authorized" 
    },
    licenseType: { type: String, default: "Standard Audio License" },
    rightsHolder: { type: String, default: "Swargiri Music" },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    status: { type: String, enum: ["active", "pending_review", "archived"], default: "active" },
    playsCount: { type: Number, default: 0 },
    likesCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

// Search text index
songSchema.index({ title: "text", artist: "text", album: "text", lyrics: "text" });

export default mongoose.models.Song || mongoose.model("Song", songSchema);
