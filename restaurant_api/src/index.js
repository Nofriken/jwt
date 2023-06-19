import express from "express";
import env from "dotenv";
import db_url from "./config/database-config";
import login_route from "./routes/login_route";
import menu_route from "./routes/menu_route";
env.config();

const app = express();

// middleware
app.use(express.json());

// config database
db_url();

// route
app.use(login_route);
app.use(menu_route);

const port = process.env.PORT;
app.listen(port, () => {
  console.info(`server is running in port ${port}`);
});
