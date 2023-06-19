import express from "express";
import {
  add_menu,
  find_menu,
  get_menu_list,
  order_menu,
} from "../controller/menu_controller";

const menu_route = express.Router();

menu_route.post("/api/add-menu", add_menu);
menu_route.get("/api/menus", get_menu_list);
menu_route.get("/api/menu/:id", find_menu);
menu_route.post("/api/menu/order", order_menu);

export default menu_route;
