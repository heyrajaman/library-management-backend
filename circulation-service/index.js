import express from "express";
import sequelize from "./config/db.js";
import circulationRoutes from "./routes/circulationRoutes.js";

const app = express();
app.use(express.json());

app.use("/circulation", circulationRoutes);

sequelize
  .sync()
  .then(() => console.log("Circulation DB connected & synced"))
  .catch((err) => console.error("DB error:", err));

app.listen(4004, () => {
  console.log("Circulation Service running on port 4004");
});
