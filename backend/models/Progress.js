import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
    completionPercentage: { type: Number, default: 0 },
    certificateIssued: { type: Boolean, default: false },
    certificateUrl: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.models.Progress || mongoose.model("Progress", progressSchema);
