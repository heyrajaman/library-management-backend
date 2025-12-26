import express from "express";
import sequelize from "./config/db.js";
import memberRoutes from "./routes/memberRoutes.js";

const app = express();
app.use(express.json());

app.use("/members", memberRoutes);

sequelize
  .sync()
  .then(() => console.log("Member DB connected & synced"))
  .catch((err) => console.error("DB error:", err));

app.listen(4002, () => {
  console.log("Member Service running on port 4002");
});
