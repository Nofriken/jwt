import mongoose from "mongoose";

const Menu = mongoose.Schema({
  name_menu: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
});

export default mongoose.model("Menu", Menu);
