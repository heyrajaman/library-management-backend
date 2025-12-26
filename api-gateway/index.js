import express from "express";
import proxy from "express-http-proxy";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// load root .env
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
app.use(express.json());

// ---------- ROUTES ----------

// Auth Service
app.use(
  "/api/auth",
  proxy("http://localhost:4001", {
    proxyReqPathResolver: (req) => `/auth${req.url}`,
  })
);

// Member Service
app.use(
  "/api/members",
  proxy("http://localhost:4002", {
    proxyReqPathResolver: (req) => `/members${req.url}`,
  })
);

// Book Service
app.use(
  "/api/books",
  proxy("http://localhost:4003", {
    proxyReqPathResolver: (req) => `/books${req.url}`,
  })
);

// Circulation Service
app.use(
  "/api/circulation",
  proxy("http://localhost:4004", {
    proxyReqPathResolver: (req) => `/circulation${req.url}`,
  })
);

// Fine Service
app.use(
  "/api/fines",
  proxy("http://localhost:4005", {
    proxyReqPathResolver: (req) => `/fines${req.url}`,
  })
);

// Health check
app.get("/", (req, res) => {
  res.send("API Gateway running");
});

app.listen(4000, () => {
  console.log("API Gateway running on port 4000");
});
