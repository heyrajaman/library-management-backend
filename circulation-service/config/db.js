import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// load root .env
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const sequelize = new Sequelize(
  process.env.CIRCULATION_DB_NAME || "circulation_db",
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

export default sequelize;
