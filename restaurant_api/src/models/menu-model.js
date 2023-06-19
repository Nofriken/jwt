import mongoose from "mongoose";

const Menu = mongoose.Schema({
  menuItems: [
    {
      name_menu: {
        type: String,
        require: true,
      },
      price: {
        type: Number,
        require: true,
      },
      quantity: {
        type: Number,
        require: true,
        default: 0,
      },
    },
  ],
  totalPrice: {
    type: Number,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Menu", Menu);
