import mongoose from "mongoose";

const Register = mongoose.Schema({
  email: {
    type: String,
    require: [true, "Email must be filled"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    require: true,
    minLength: [7, "minimum character is 7"],
  },
  refresh_token: {
    type: String,
  },
});

export default mongoose.model("register", Register);
