import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    title: { type: String, required: true },
    lessonNumber: { type: Number, required: true },
    durationSeconds: { type: Number, default: 600 },
    videoUrl: { type: String, required: true },
    summary: { type: String, default: "" },
    attachments: [{ title: String, fileUrl: String }]
  },
  { timestamps: true }
);

export default mongoose.models.Lesson || mongoose.model("Lesson", lessonSchema);
