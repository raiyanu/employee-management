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

		const { name, email, mobile, designation, gender, course, address } = req.body;
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
			f_Course: course,
			f_Address: address,
		});

		if (employee) {
			res.status(201).redirect("https://employee-management-kappa-blue.vercel.app//employees");
		}
	});
});

// @desc Get all employees
// route GET /api/employee/page/:pageNo
// @access Private
const getEmployees = asyncHandler(async (req, res) => {
	const pageSize = 10;
	const page = Number(req.params.pageNo) || 1;

	let count = await Employee.countDocuments();
	if (count === 0) {
		res.status(404);
		throw new Error("No employees found");
	}
	const pages =
		Math.ceil(count - (count % pageSize)) / pageSize +
		(count % pageSize === 0 ? 0 : 1);
	const employees = await Employee.find().sort({ f_Id: 1 })
		// .select("-f_Image")
		.limit(pageSize)
		.skip(pageSize * (page - 1));
	console.log(
		`Count: ${count}, Pages: ${pages}, Page: ${page}, PageSize: ${pageSize}`
	);
	employees.sort((a, b) => a.f_Id - b.f_Id);
	// console.log(employees[0].f_Image);
	res.json({
		page,
		pages,
		count,
		employees,
	});
});

// @desc Get an employee by ID
// route GET /api/employee/:EmployeeId
// @access Private
const getEmployee = asyncHandler(async (req, res) => {
	const employee = await Employee.findOne({ f_Id: req.params.EmployeeId });
	if (employee) {
		// console.log(employee);
		res.json(employee);
	} else {
		res.status(404);
		throw new Error("Employee not found");
	}
});

// @desc Delete an employee by ID
// route DELETE /api/employee/:EmployeeId
// @access Private
const deleteEmployee = asyncHandler(async (req, res) => {
	const employee = await Employee.findOneAndDelete({
		f_Id: req.params.EmployeeId,
	});
	console.log("Employee:", employee);
	if (employee) {
		res.status(200).json({ message: "Employee removed" });
	} else {
		res.status(404);
		throw new Error("Employee not found");
	}
});

// @desc Update an employee by ID
// route PUT /api/employee/:EmployeeId
// @access Private
const putEmployee = asyncHandler((req, res, next) => {
	upload.single("profile")(req, res, async (err) => {
		if (err) {
			return next(err);
		}
		const { EmployeeId } = req.params;
		try {
			const served = {
				name: req.body.name,
				email: req.body.email,
				mobile: req.body.mobile,
				designation: req.body.designation,
				course: req.body.course,
				gender: req.body.gender,
			};
			console.log("served:", served);
			console.log("id:", EmployeeId);

			const employee = await Employee.findOneAndUpdate(
				{
					f_Id: EmployeeId,
				},
				{
					f_Name: req.body.name,
					f_Email: req.body.email,
					f_Mobile: req.body.mobile,
					f_Designation: req.body.designation,
					f_Course: req.body.course,
					f_Gender: req.body.gender,
					f_Image: req.file
						? { data: req.file.buffer, contentType: req.file.mimetype }
						: null,
					f_Address: req.body.address,
				}
			);
			console.log("old employee:", employee);
			if (!employee) {
				res.status(500);
				throw new Error("Employee not found");
			}
			res.json(employee);
		} catch (error) {
			console.error("Error updating employee:", error);
			res.status(500);
		}
	});
});

export { postEmployee, getEmployees, getEmployee, deleteEmployee, putEmployee };

const storage = multer.memoryStorage();
const upload = multer({ storage });
export { upload };
