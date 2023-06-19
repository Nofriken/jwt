import mongoose from "mongoose";

const Note = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  note: {
    type: String,
    require: true,
  },
});

export default mongoose.model("note", Note);
