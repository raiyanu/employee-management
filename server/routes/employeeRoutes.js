import { protect } from "../middleware/authMiddleware.js";
import express from "express";
import {
	postEmployee,
	getEmployees,
	getEmployee,
	deleteEmployee,
} from "../controllers/employeeController.js";
const router = express.Router();

router.route("/:EmployeeId").get(getEmployee).delete(protect, deleteEmployee);
router
	.route("/")
	.post(protect, postEmployee)
	.put(protect, (req, res) => {
		res.send("Employee route for updating");
	});
router.route("/page/:pageNo").get(protect, getEmployees);

export default router;
