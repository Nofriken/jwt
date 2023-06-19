import { request, response } from "express";
import Menu from "../model/menu_model";

export const add_menu = async (req = request, res = response) => {
  const data = await new Menu(req.body);

  try {
    const menu = await data.save();
  } catch (error) {}
};
