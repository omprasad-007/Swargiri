import mongoose from "mongoose";

const albumSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    artist: { type: String, required: true },
    artistId: { type: mongoose.Schema.Types.ObjectId, ref: "Artist" },
    coverImage: { type: String, default: "" },
    genre: { type: String, default: "Classical" },
    releaseYear: { type: Number, default: 2024 },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
    totalTracks: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.models.Album || mongoose.model("Album", albumSchema);
