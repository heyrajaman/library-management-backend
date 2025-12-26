import express from "express";
import sequelize from "./config/db.js";
import bookRoutes from "./routes/bookRoutes.js";

const app = express();
app.use(express.json());

app.use("/books", bookRoutes);

sequelize
  .sync()
  .then(() => console.log("Book DB connected & synced"))
  .catch((err) => console.error("DB error:", err));

app.listen(4003, () => {
  console.log("Book Service running on port 4003");
});
