import mongoose, { Document, Schema, Model } from "mongoose";

export interface ILesson extends Document {
  title: string;
  rating: number;       // 0–5
  createdAt: Date;
  updatedAt: Date;
}

const LessonSchema: Schema<ILesson> = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 140 },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
      set: (v: number) => Math.round(v * 10) / 10,
    },
  },
  { timestamps: true }
);

LessonSchema.index({ rating: -1, updatedAt: -1 });

const Lesson: Model<ILesson> =
  mongoose.models?.Lesson || mongoose.model<ILesson>("Lesson", LessonSchema);

export default Lesson;
