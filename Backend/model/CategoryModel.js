import { DataTypes } from "sequelize";
import { sequelize } from "../postgres/postgres.js";
// Correct import path

const Category = sequelize.define("Category", {
  CategoryID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Ensure this matches your table configuration
  },
  Name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  IsActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

export default Category;
