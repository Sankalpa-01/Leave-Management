import Employee from "../models/Employee.js";

// add new employee
export const addEmployee = async (req, res) => {
  try {
    const { name, email, department, joiningDate } = req.body;
    const employee = await Employee.create({
      name,
      email,
      department,
      joiningDate,
    });
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// fetch leave balance
export const getLeaveBalance = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ leaveBalance: employee.leaveBalance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all employees (HR only)
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
