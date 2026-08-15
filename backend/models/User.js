import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firebaseUid: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true },
    displayName: { type: String, default: "" },
    photoURL: { type: String, default: "" },
    roles: {
      type: [String],
      enum: ["USER", "STUDENT", "ARTIST", "KIRTANKAR", "INSTRUCTOR", "ADMIN", "ORGANIZATION_ADMIN"],
      default: ["USER"]
    },
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: "Organization", default: null },
    preferredLanguages: [{ type: String }],
    preferredGenres: [{ type: String }],
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
    playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Playlist" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "Artist" }],
    status: { type: String, enum: ["active", "suspended", "pending"], default: "active" }
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
