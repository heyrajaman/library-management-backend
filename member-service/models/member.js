import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Member = sequelize.define(
  "Member",
  {
    memberId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "ACTIVE",
    },
  },
  {
    tableName: "members",
    timestamps: true,
  }
);

export default Member;
