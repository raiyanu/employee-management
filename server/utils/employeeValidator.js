export default function empValidate(employee) {
	const { name, email, mobile, designation, gender } = employee;
	const errors = {};
	if (!name) {
		errors.haveError = true;
		errors.message = "Name is required";
	}
	if (!email) {
		errors.haveError = true;
		errors.message = "Email is required";
	}
	if (!mobile) {
		errors.haveError = true;
		errors.message = "Mobile is required";
	}
	if (!designation) {
		errors.haveError = true;
		errors.message = "Designation is required";
	}
	if (!gender) {
		errors.haveError = true;
		errors.message = "Gender is required";
	}
	return errors;
}
