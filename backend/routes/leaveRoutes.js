import express from "express";
import {
  applyLeave,
  updateLeaveStatus,
  getAllLeaves,
  getEmployeeLeaves,
} from "../controllers/leaveController.js";

const router = express.Router();

router.post("/", applyLeave);
router.put("/:id", updateLeaveStatus);
router.get("/all-leaves", getAllLeaves);
router.get("/employee/:id", getEmployeeLeaves);

export default router;
