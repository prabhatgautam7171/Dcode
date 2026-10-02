import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
   owner : {
    type : mongoose.Schema.Types.ObjectId ,
    ref : "User",
    required : true
   },
   name : {
    type : String,
    required : true
   },
   description : {
    type: String,
    default : ""
   },
   starred : {
    type : Boolean,
    default : false
   },
   lastOpenedAt : {
    type : Date,
    default : Date.now
   }
})

export const Project = mongoose.model("Project", projectSchema);
