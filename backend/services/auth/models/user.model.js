import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firebaseUid: {
    type: String,
    required: true,
    unique: true,
    trim : true,
  },
  name : {
    type: String,
    required: true,
    trim : true,
  },
  email : {
    type: String,
    required: true,
    unique: true,
    trim : true,
    lowercase: true,
  },
  avatar : {
    type: String,
    default: "",
    trim : true,
  }

},{
  timestamps: true,
});

export const User = mongoose.model("User", userSchema);


