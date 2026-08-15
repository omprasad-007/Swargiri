import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    instrumentOrSubject: { 
      type: String, 
      required: true,
      enum: [
        "Singing", "Harmonium", "Tabla", "Mridang", "Guitar", "Piano", 
        "Keyboard", "Drums", "Violin", "Flute", "Music Theory", "Production", "Songwriting"
      ]
    },
    instructor: { type: String, required: true },
    instructorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    level: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], default: "Beginner" },
    description: { type: String, default: "" },
    thumbnail: { type: String, default: "" },
    durationMinutes: { type: Number, default: 120 },
    lessonsCount: { type: Number, default: 6 },
    enrolledStudentsCount: { type: Number, default: 0 },
    rating: { type: Number, default: 4.8 },
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
    certificateEligible: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.models.Course || mongoose.model("Course", courseSchema);
