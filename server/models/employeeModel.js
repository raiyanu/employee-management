import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
	f_Id: {
		type: Number,
		required: true,
		// unique: true,
	},
	f_Image: {
		data: Buffer,
		contentType: String,
	},
	f_Name: {
		type: String,
		required: true,
	},
	f_Email: {
		type: String,
		required: true,
		// unique: true,
	},
	f_Mobile: {
		type: String,
		required: true,
		// unique: true,
	},
	f_Designation: {
		type: String,
		required: true,
	},
	f_Gender: {
		type: String,
		required: true,
		enum: ["Male", "Female"], // Assuming fixed gender options
	},
	f_Course: {
		type: String,
		required: false, // Optional field
	},
	f_Createdate: {
		type: Date,
		default: Date.now, // Automatically sets the creation date to the current time
	},
});

// Create the model
const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
