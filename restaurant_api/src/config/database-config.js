import mongoose from "mongoose";
import env from "dotenv";

const db_url = () => {
  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on("err", (err) => console.info(err));
  db.once("open", () => console.info("Database Connected"));
};

export default db_url;
