import express from "express";
import sequelize from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);

sequelize
  .sync()
  .then(() => console.log("Auth DB connected & synced"))
  .catch((err) => console.error("DB error:", err));

app.listen(4001, () => {
  console.log("Auth Service running on port 4001");
});
