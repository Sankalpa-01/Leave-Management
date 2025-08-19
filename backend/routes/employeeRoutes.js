import express from "express";
import {
  addEmployee,
  getLeaveBalance,
  getAllEmployees,
} from "../controllers/employeeController.js";

const router = express.Router();

router.post("/add-employee", addEmployee);
router.get("/:id/leave-balance", getLeaveBalance);
router.get("/all-employee", getAllEmployees);

export default router;
