import express from "express";
import sequelize from "./config/db.js";
import fineRoutes from "./routes/fineRoutes.js";

const app = express();
app.use(express.json());

app.use("/fines", fineRoutes);

sequelize
  .sync()
  .then(() => console.log("Fine DB connected & synced"))
  .catch((err) => console.error("DB error:", err));

app.listen(4005, () => {
  console.log("Fine Service running on port 4005");
});
