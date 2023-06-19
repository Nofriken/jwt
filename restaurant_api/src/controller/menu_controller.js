import { request, response } from "express";
import Menu from "../models/menu-model";

export const add_menu = async (req = request, res = response) => {
  const data = await new Menu(req.body);

  try {
    const menu = await data.save();
    res.status(201).json({
      data: {
        menu: menu,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const get_menu_list = async (req = request, res = response) => {
  try {
    const allData = await Menu.find();
    res.status(200).json({
      menu: allData,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// get menu by id
export const find_menu = async (req = request, res = response) => {
  try {
    const data = await Menu.findById({
      _id: req.params.id,
    });
    res.status(200).json({
      success: true,
      menu: data,
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};

// order menu
export const order_menu = async (req = request, res = response) => {
  const { name_menu, price, quantity } = await req.body;

  try {
    const order = await Menu.findOne({
      menu: name_menu,
    });

    // if (!name_menu) {
    //   return res.json({
    //     message: "menu must be filled",
    //   });
    // }

    // check menu ada atau ga
    if (!order) {
      return res.status(404).json({
        message: "Menu Dont Have In The List",
      });
    }
    // check harga sama atau ga di databese
    if (order.price !== price) {
      return res.json({
        message: "Price Not Same as Menu list",
      });
    }
    const payment = price * quantity;

    res.status(200).json({
      menu: name_menu,
      totalPrice: payment,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
