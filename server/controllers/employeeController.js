// postEmployee,
// getEmployees,
// getEmployee,
import asyncHandler from "express-async-handler";
import Employee from "../models/employeeModel.js";

// @desc Create a new employee
// route POST /api/employee/
// @access Private
const postEmployee = asyncHandler(async (req, res) => {
	const {
		f_Id,
		f_Image,
		f_Name,
		f_Email,
		f_Mobile,
		f_Designation,
		f_Gender,
		f_Course,
	} = req.body;
	const employeeExists = await Employee.findOne({ f_Email });
	if (employeeExists) {
		res.status(400);
		throw new Error("Employee already exists");
	}

	const employee = await Employee.create({
		f_Id,
		f_Image: {
			data: req.file.buffer, // Store image buffer
			contentType: req.file.mimetype, // Store image MIME type
		},
		f_Name,
		f_Email,
		f_Mobile,
		f_Designation,
		f_Gender,
		f_Course,
	});

	if (employee) {
		res.status(201).json({
			_id: employee._id,
			f_Id: employee.f_Id,
			f_Image: employee.f_Image,
			f_Name: employee.f_Name,
			f_Email: employee.f_Email,
			f_Mobile: employee.f_Mobile,
			f_Designation: employee.f_Designation,
			f_Gender: employee.f_Gender,
		});
	}
});

// @desc Get all employees
// route GET /api/employee/page/:pageNo
// @access Private
const getEmployees = asyncHandler(async (req, res) => {
	const pageSize = 10;
	const page = Number(req.params.pageNo) || 1;

	const count = await Employee.countDocuments();
	const employees = await Employee.find()
		.limit(pageSize)
		.skip(pageSize * (page - 1));

	res.json({ employees, page, pages: Math.ceil(count / pageSize) });
});

// @desc Get an employee by ID
// route GET /api/employee/:EmployeeId
// @access Private
const getEmployee = asyncHandler(async (req, res) => {
	const employee = await Employee.findById(req.params.EmployeeId);

	if (employee) {
		res.json(employee);
	} else {
		res.status(404);
		throw new Error("Employee not found");
	}
});

export { postEmployee, getEmployees, getEmployee };
