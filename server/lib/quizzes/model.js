import mongoose from "mongoose";
const Schema = mongoose.Schema;
const QuizSchema = new mongoose.Schema({
  quiz: { type: Object, required: true },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
//export model
export default mongoose.model("Quiz", QuizSchema);
