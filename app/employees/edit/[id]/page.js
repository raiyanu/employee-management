"use client";
import AppHeader from "../../../components/AppHeader";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
export default function Home() {
	const [employee, setEmployee] = useState({});
	const { id } = useParams();
	const fetchEmployee = async (id) => {
		try {
			const response = await axios.get(`/api/employee/${id}`);
			if (response.status === 200 && response.data) {
				setEmployee(response.data);
				console.log("Employee:", response.data);
			} else {
				throw new Error("Invalid response");
			}
		} catch (error) {
			console.error("Error fetching employees:", error);
			if (error.response.status === 401) {
				alert("Unauthorized access. Redirecting to login page.");
				router.push("/");
			}
		}
	};
	useEffect(() => {
		fetchEmployee(id);
	}, []);
	return (
		<>
			<AppHeader />
			<form
				action={`/api/employee/${id}`}
				className="*:max-w-sm *:max-lg:mx-auto *:max-lg:mt-3 lg:grid lg:grid-cols-2 border-2 max-w-2xl gap-y-2 gap-x-4 mx-auto p-4 rounded-lg "
				onSubmit={async (e) => {
					e.preventDefault(); // Prevent default form submission
					try {
						const formData = new FormData(e.target);
						const response = await axios.put(`/api/employee/${id}`, formData);
						console.log("Response:", response);
						if (response.status === 200) {
							alert("Employee updated successfully");
							fetchEmployee(id);
						} else {
							alert(
								"Error updating employee:" +
									response.data.problem +
									"\n" +
									Array.from(response.data.keyPattern)[0]
							);
						}
					} catch (error) {
						alert(
							"Error updating employee:" +
								error.data.problem +
								"\n" +
								Array.from(error.data.keyPattern)[0]
						);
						console.error("Error updating employee:", error);
						if (error.response.status === 401) {
							alert("Unauthorized access. Redirecting to login page.");
							router.push("/");
						}
					}
				}}
				encType="multipart/form-data"
			>
				<label className="input input-bordered flex items-center gap-2">
					UUID:
					<input
						type="text"
						className="grow"
						placeholder="id"
						name="f_Id"
						defaultValue={employee.f_Id}
						disabled
					/>
				</label>
				<label className="input input-bordered flex items-center gap-2">
					Name:
					<input
						type="text"
						className="grow"
						placeholder="Name"
						name="name"
						defaultValue={employee.f_Name}
					/>
				</label>
				<label className="input input-bordered flex items-center gap-2">
					Email:
					<input
						type="text"
						className="grow"
						placeholder="Email"
						name="email"
						defaultValue={employee.f_Email}
					/>
				</label>
				<label className="input input-bordered flex items-center gap-2">
					Mobile:
					<input
						type="text"
						className="grow"
						placeholder="Mobile"
						name="mobile"
						defaultValue={employee.f_Mobile}
					/>
				</label>
				<label className="input input-bordered flex items-center gap-2">
					Designation:
					<input
						type="text"
						className="grow"
						placeholder="Designation"
						name="designation"
						defaultValue={employee.f_Designation}
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
						defaultValue={employee.f_Course}
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
