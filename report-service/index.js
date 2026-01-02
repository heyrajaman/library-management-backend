import express from "express";
import reportRoutes from "./routes/reportRoutes.js";

const app = express();
app.use(express.json());

app.use("/reports", reportRoutes);

app.listen(4006, () => {
  console.log("Report Service running on port 4006");
});
