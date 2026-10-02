import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  owner : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
    default: null,
  },
  name: {
    type: String,
    required: true,
  },
  type : {
    type: String,
    enum: ["file", "folder"],
    required: true,
  },
  content: {
    type: String,
    default: "",
  },
  extension: {
    type: String,
    default: "",
  },
  visibility: {
    type: String,
    enum: ["Private", "Public"],
    default: "Private",
  },
  language: {
    type: String,
    default: "plaintext",
  },
  starred: {
    type: Boolean,
    default: false,
  },
  size : {
    type: Number,
    default: 0,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export const File = mongoose.model("File", fileSchema);
