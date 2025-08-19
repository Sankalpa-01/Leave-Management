import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Employee from "./Employee.js";

const Leave = sequelize.define("Leave", {
  startDate: { type: DataTypes.DATE, allowNull: false },
  endDate: { type: DataTypes.DATE, allowNull: false },
  status: {
    type: DataTypes.ENUM("Pending", "Approved", "Rejected"),
    defaultValue: "Pending",
  },
});

Employee.hasMany(Leave, { foreignKey: "employeeId" });
Leave.belongsTo(Employee, { foreignKey: "employeeId" });

export default Leave;
