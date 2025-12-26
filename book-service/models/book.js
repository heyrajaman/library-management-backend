import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Book = sequelize.define(
  "Book",
  {
    bookId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    available: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    shelfLocation: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "books",
    timestamps: true,
  }
);

export default Book;
