import mongoose, { Document, Schema, Model, Types } from "mongoose";

export interface ICard extends Document {
  lessonId: Types.ObjectId;
  front: string;
  back: string;
  learned?: boolean;        // <- new
  createdAt: Date;
  updatedAt: Date;
}

const CardSchema: Schema<ICard> = new Schema(
  {
    lessonId: { type: Schema.Types.ObjectId, ref: "Lesson", required: true, index: true },
    front: { type: String, required: true, trim: true, maxlength: 1000 },
    back:  { type: String, required: true, trim: true, maxlength: 2000 },
    learned: { type: Boolean, default: false }, // <- new
  },
  { timestamps: true }
);

// helpful for filtering learned/unlearned in lists
CardSchema.index({ lessonId: 1, learned: 1, createdAt: -1 });

const Card: Model<ICard> =
  mongoose.models?.Card || mongoose.model<ICard>("Card", CardSchema);

export default Card;
