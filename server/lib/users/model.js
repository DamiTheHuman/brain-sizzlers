import mongoose from "mongoose";
const Schema = mongoose.Schema;
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  picture: { type: String, required: true },
  quizzes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
    },
  ],
});
//export model
export default mongoose.model("User", UserSchema);
