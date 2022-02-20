const mongoose = require("mongoose");

//Create an Schema Object mongoose
const userSchema = mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    dob: String,
    role: String,
    biodata: String,
    photo: String,
  },
  { versionKey: false }
);

module.exports = mongoose.model("userModel", userSchema, "userlist");
//userModel => Name of Model
//userSchema => Schema of the Model
//userlist   =>Name of the colllection.

console.log("User Model is created");
