"use client";
import AppHeader from "../components/AppHeader";
import { useState } from "react";

export default function Home() {
	const [errors, setErrors] = useState([]);
	const validateForm = (event) => {
		event.preventDefault();

		const form = event.target;
		let errorList = [];

		if (!form.name.value.trim()) errorList.push("Name is required.");
		if (!form.email.value.trim()) errorList.push("Email is required.");
		if (!form.mobile.value.trim()) errorList.push("Mobile is required.");
		if (!form.designation.value.trim())
			errorList.push("Designation is required.");
		if (!form.gender.value) errorList.push("Gender is required.");
		if (!form.course.value.trim()) errorList.push("Course is required.");
		if (!form.address.value.trim()) errorList.push("Address is required.");
		if (!form.profile.files[0]) errorList.push("Profile picture is required.");

		if (errorList.length > 0) {
			setErrors(errorList);
			console.log("errors", errors);
			document.getElementById("formInvalidPopUp").showModal();
			return false;
		}

		form.submit();
		return true;
	};
	return (
		<>
			<AppHeader />
			<dialog id="formInvalidPopUp" className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Please fullfil required</h3>
					{errors.length > 0 && (
						<ul>
							{errors.map((error, index) => (
								<li key={index}>{error}</li>
							))}
						</ul>
					)}
					<div className="modal-action">
						<form method="dialog">
							<button className="btn">Close</button>
						</form>
					</div>
				</div>
			</dialog>
			<form
				onSubmit={validateForm}
				action="/api/employee/"
				className="*:max-w-sm *:max-lg:mx-auto *:max-lg:mt-3 lg:grid lg:grid-cols-2 border-2 max-w-2xl gap-y-2 gap-x-4 mx-auto p-4 rounded-lg "
				method="POST"
				encType="multipart/form-data"
			>
				<label className="input input-bordered flex items-center gap-2">
					Name:
					<input type="text" className="grow" placeholder="Name" name="name" />
				</label>
				<label className="input input-bordered flex items-center gap-2">
					Email:
					<input
						type="text"
						className="grow"
						placeholder="Email"
						name="email"
					/>
				</label>
				<label className="input input-bordered flex items-center gap-2">
					Mobile:
					<input
						type="text"
						className="grow"
						placeholder="Mobile"
						name="mobile"
					/>
				</label>
				<label className="input input-bordered flex items-center gap-2">
					Designation:
					<input
						type="text"
						className="grow"
						placeholder="Designation"
						name="designation"
					/>
				</label>
				<label className="input input-bordered flex items-center gap-2">
					Gender: Male
					<input
						type="radio"
						name="gender"
						value="male"
						className="radio"
						defaultChecked
					/>
					Female
					<input type="radio" name="gender" value="female" className="radio" />
				</label>
				<label className="input input-bordered flex items-center gap-2">
					Course:
					<input
						type="text"
						className="grow"
						placeholder="Course"
						name="course"
					/>
				</label>
				<label className="input input-bordered flex items-center gap-2">
					Address:
					<input
						type="text"
						className="grow"
						placeholder="Address"
						name="address"
					/>
				</label>
				<label className="input input-bordered flex items-center gap-2">
					Profile:
					<input
						type="file"
						name="profile"
						accept="image/*"
						className="file-input file-input-bordered rounded file-input-sm grow w-full"
					/>
				</label>
				<button
					type="submit"
					className="block btn btn-primary col-span-2 mx-auto w-full max-w-[300px]"
				>
					Submit
				</button>
			</form>
		</>
	);
}
