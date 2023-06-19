import express from "express";
import {
  add_user,
  login_user,
  read_data,
} from "../controller/login_controller";

const login_route = express.Router();

login_route.post("/api/user/register", add_user);
login_route.post("/api/user/login", login_user);
login_route.get("/api/users/read", read_data);
export default login_route;
