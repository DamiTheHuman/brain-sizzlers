import mongoose from "mongoose";
const Schema = mongoose.Schema;
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    picture: { type: String, required: true },
    points: { type: Number, default: 0 },
    quizzesAttempted: { type: Number, default: 0 },
    quizzes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Quiz",
      },
    ],
  },
  {
    timestamps: true,
  }
);
//export model
export default mongoose.model("User", UserSchema);
