import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import env from "dotenv";
import login_route from "./routes/login_route";
import note_route from "./routes/note_route";
env.config();

const app = express();

// database connection
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (err) => console.info(err));
db.once("open", () => console.info("Database Connected.."));

// middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// route
app.use(login_route);
app.use(note_route);

const port = process.env.PORT;
app.listen(port, () => {
  console.info(`Server running in port ${port}`);
});
