import Leave from "../models/Leave.js";
import Employee from "../models/Employee.js";
import { Op } from "sequelize";

// Apply for leave
export const applyLeave = async (req, res) => {
  try {
    const { employeeId, startDate, endDate } = req.body;

    const employee = await Employee.findByPk(employeeId);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    if (new Date(startDate) < employee.joiningDate) {
      return res
        .status(400)
        .json({ message: "Leave cannot be before joining date" });
    }

    if (new Date(endDate) < new Date(startDate)) {
      return res
        .status(400)
        .json({ message: "End date cannot be before start date" });
    }

    const leaveDays =
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1;

    if (leaveDays > employee.leaveBalance) {
      return res.status(400).json({ message: "Not enough leave balance" });
    }

    // Overlapping check
    const overlapping = await Leave.findOne({
      where: {
        employeeId,
        status: "Approved",
        [Op.or]: [
          {
            startDate: { [Op.lte]: endDate },
            endDate: { [Op.gte]: startDate },
          },
        ],
      },
    });

    if (overlapping) {
      return res.status(400).json({ message: "Overlapping leave request" });
    }

    const leave = await Leave.create({ employeeId, startDate, endDate });
    res.status(201).json(leave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Approve / Reject leave
export const updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const leave = await Leave.findByPk(req.params.id, { include: Employee });
    if (!leave) return res.status(404).json({ message: "Leave not found" });

    leave.status = status;
    await leave.save();

    if (status === "Approved") {
      const days =
        (new Date(leave.endDate) - new Date(leave.startDate)) /
          (1000 * 60 * 60 * 24) +
        1;
      leave.Employee.leaveBalance -= days;
      await leave.Employee.save();
    }

    res.json(leave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all leave requests (HR)
export const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.findAll({ include: Employee });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get leave history of a specific employee
export const getEmployeeLeaves = async (req, res) => {
  try {
    const leaves = await Leave.findAll({
      where: { employeeId: req.params.id },
    });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
