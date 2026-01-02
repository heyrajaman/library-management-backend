import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Fine = sequelize.define(
  "Fine",
  {
    fineId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    memberId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    transactionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    paidStatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    paidDate: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "fines",
    timestamps: true,
  }
);

export default Fine;
