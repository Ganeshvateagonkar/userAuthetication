import mongoose from "mongoose";
import pkg from "validator";
import bcrypt from "bcrypt";
const { isEmail } = pkg;
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "please enter email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "please enter valid email"],
  },
  password: {
    type: String,
    required: [true, "please enter password"],
    minlength: [6, "minimum password length should be 6 character"],
  },
});

userSchema.post("save", function (doc, next) {
  console.log("user created successfully", doc);
  next();
});
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
const User = mongoose.model("User", userSchema);

export default User;
