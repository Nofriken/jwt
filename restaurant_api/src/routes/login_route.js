import express from "express";
import {
  login,
  read_data_users,
  register,
  removeuser,
} from "../controller/login_controller";
import { validation_data } from "../middleware/login_validation";

const login_route = express.Router();

login_route.post("/api/register", register);
login_route.post("/api/user/login", login);
login_route.get("/api/users", read_data_users);
login_route.delete("/api/user/remove/:id", removeuser);

export default login_route;
