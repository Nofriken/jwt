import express from "express";
import env from "dotenv";
import { db_url } from "./middleware/db_url";
env.config();

const app = express();

// db url
db_url();

app.use(express.json());

// port
const port = process.env.PORT;
app.listen(port, () => {
  console.info(`Server is running in port ${port}`);
});
