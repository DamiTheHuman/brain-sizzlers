const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  picture: { type: String, required: true },
});

//Pass unto model
const User = mongoose.model("User", UserSchema);
module.exports = User; //give access to the object
