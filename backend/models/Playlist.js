import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    description: { type: String, default: "" },
    coverImage: { type: String, default: "" },
    creator: { type: String, default: "Swargiri Curators" },
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    isPublic: { type: Boolean, default: true },
    isCorporate: { type: Boolean, default: false },
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: "Organization", default: null },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
    category: { type: String, default: "Featured" }
  },
  { timestamps: true }
);

export default mongoose.models.Playlist || mongoose.model("Playlist", playlistSchema);
