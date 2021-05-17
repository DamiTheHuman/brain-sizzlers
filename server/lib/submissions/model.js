import mongoose from "mongoose";
const Schema = mongoose.Schema;
const SubmissionSchema = new mongoose.Schema(
  {
    correct: { type: Number, required: true },
    wrong: { type: Number, required: true },
    quiz: {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
//export model
export default mongoose.model("Submission", SubmissionSchema);
