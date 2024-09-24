import asyncHandler from "express-async-handler";
import Employee from "../models/employeeModel.js";
import multer from "multer";
import empValidate from "../utils/employeeValidator.js";

// @desc Create a new employee
// route POST /api/employee/
// @access Private
const postEmployee = asyncHandler((req, res, next) => {
	upload.single("profile")(req, res, async (err) => {
		if (err) {
			return next(err);
		}

		const fileBuffer = req.file?.buffer;
		const fileName = req.file?.originalname;
		const fileMimeType = req.file?.mimetype;

		if (!fileBuffer) {
			console.error("File buffer is empty or undefined");
			return res.status(500).json({ error: "File buffer is empty" });
		}

		// Process the file buffer, file name, and file MIME type as needed
		console.log("File Buffer:", fileBuffer);
		console.log("File Name:", fileName);
		console.log("File MIME Type:", fileMimeType);

		const validateError = empValidate(req.body);
		if (validateError.haveError) {
			return res.status(400).send({ message: validateError.message });
		}

		const { name, email, mobile, designation, gender } = req.body;
		const employeeExists = await Employee.findOne({ email });
		if (employeeExists) {
			res.status(400);
			return next(new Error("Employee already exists"));
		}

		const employee = await Employee.create({
			f_Image: {
				data: fileBuffer,
				contentType: fileMimeType,
			},
			f_Name: name,
			f_Email: email,
			f_Gender: gender,
			f_Mobile: mobile,
			f_Designation: designation,
		});

		if (employee) {
			res.status(201).redirect("/employees");
		}
	});
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

const storage = multer.memoryStorage();
const upload = multer({ storage });
export { upload };
