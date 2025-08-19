import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import bcrypt from "bcryptjs";

const Employee = sequelize.define("Employee", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  department: { type: DataTypes.STRING },
  joiningDate: { type: DataTypes.DATE },
  role: {
    type: DataTypes.ENUM("HR", "Employee"),
    allowNull: false,
    defaultValue: "Employee",
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "changeme",
  },
  leaveBalance: { type: DataTypes.INTEGER, defaultValue: 20 },
});

// Helper: hash password before saving
Employee.beforeCreate(async (user) => {
  user.passwordHash = await bcrypt.hash(user.passwordHash, 10);
});

export default Employee;
