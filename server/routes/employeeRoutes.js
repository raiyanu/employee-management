import { protect } from "../middleware/authMiddleware.js";
import express from "express";
import {
	postEmployee,
	getEmployees,
	getEmployee,
	deleteEmployee,
	putEmployee,
} from "../controllers/employeeController.js";
import getEmployeeInfo from "../controllers/getEmployeeInfoController.js"
const router = express.Router();

router
	.route("/:EmployeeId")
	.get(getEmployee)
	.delete(protect, deleteEmployee)
	.put(protect, putEmployee);
router
	.route("/info")
	.get(getEmployeeInfo)
router
	.route("/")
	.post(protect, postEmployee)
	.put(protect, (req, res) => {
		res.send("Employee route for updating");
	});
router.route("/page/:pageNo").get(protect, getEmployees);

export default router;
