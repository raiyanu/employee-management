import { protect } from "../middleware/authMiddleware.js";
import express from "express";
import {
	postEmployee,
	getEmployees,
	getEmployee,
} from "../controllers/employeeController.js";
const router = express.Router();

router.route("/:EmployeeId").get(getEmployee);
router
	.route("/")
	.post(postEmployee)
	// .post(protect, postEmployee)

	.put(protect, (req, res) => {
		res.send("Employee route for updating");
	});
router.route("/page/:pageNo").get(getEmployees);

export default router;
