import mongoose from "mongoose";
const Schema = mongoose.Schema;
const QuizSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    questions: { type: Object, required: true },
    difficulty: { type: Number, required: true },
    timesCompleted: { type: Number, required: true },
    attempts: { type: Number, required: true },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
//export model
export default mongoose.model("Quiz", QuizSchema);
