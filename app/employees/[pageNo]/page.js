"use client";
import Image from "next/image";
import AppHeader from "../../components/AppHeader";
import Link from "next/link";
import { useParams } from "next/navigation";

function deleteEmployee(f_Id) {
	alert(`Delete employee with ID: ${f_Id}`);
}
function editEmployee(f_Id) {
	alert(`Edit employee with ID: ${f_Id}`);
}
export default function Home() {
	const { pageNo } = useParams();
	const employees = t_employees;
	const meta = {
		activePage: pageNo ? parseInt(pageNo) : 1,
		totalPages: 5,
	};

	return (
		<div>
			<AppHeader />
			<EmployeeTable employees={employees} meta={meta} />
		</div>
	);
}
export function EmployeeTable({ employees, meta }) {
	const renderButtons = () => {
		const current = meta.activePage;
		const totalPage = meta.totalPages;
		const buttons = [];
		let startPage = Math.max(1, current - 2);
		let endPage = Math.min(totalPage, current + 2);

		if (current <= 3) {
			endPage = Math.min(totalPage, 5);
		} else if (current >= totalPage - 2) {
			startPage = Math.max(1, totalPage - 4);
		}

		for (let i = startPage; i <= endPage; i++) {
			buttons.push(
				<Link
					key={i}
					className={`join-item btn btn-sm ${
						i === current ? "btn-active" : ""
					}`}
					href={`/employees/${i}`}
				>
					{i}
				</Link>
			);
		}
		return buttons;
	};
	return (
		<div className="overflow-x-auto">
			<table className="table">
				{/* head */}
				<thead>
					<tr className="*:cursor-pointer">
						<th>UUID</th>
						<th>Image</th>
						<th>Name</th>
						<th>Email</th>
						<th>Mobile No.</th>
						<th>Designation</th>
						<th>Gender</th>
						<th>Course</th>
						<th>Created date</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{employees.map((employee) => (
						<EmployeeTuple key={employee.f_Id} employee={employee} />
					))}
				</tbody>
			</table>
			<div className="join flex items-center justify-center py-2">
				{renderButtons()}
			</div>
		</div>
	);
}

export function EmployeeTuple({ employee }) {
	return (
		<tr>
			<td> {employee.f_Id} </td>
			<td>
				<div className="flex items-center gap-3">
					<div className="avatar">
						<div className="mask mask-squircle h-12 w-12">
							<img
								src="https://img.daisyui.com/images/profile/demo/2@94.webp"
								alt="Avatar Tailwind CSS Component"
							/>
						</div>
					</div>
					{/* <div>
						<div className="font-bold">{employee.f_Name}</div>
						 <div className="text-sm opacity-50">United States</div> 
					</div> */}
				</div>
			</td>
			<td>{employee.f_Name}</td>
			<td>{employee.f_Email}</td>
			<td>{employee.f_Mobile}</td>
			<td>{employee.f_Designation}</td>
			<td>{employee.f_Gender}</td>
			<td>{employee.f_Course}</td>
			<td>{employee.f_Createdate}</td>
			<td>
				<div className="flex gap-2">
					<button
						className="btn btn-sm btn-outline btn-secondary"
						onClick={() => editEmployee(employee.f_Id)}
					>
						Edit
					</button>
					<button
						className="btn btn-sm btn-outline btn-error"
						onClick={() => deleteEmployee(employee.f_Id)}
					>
						Delete
					</button>
				</div>
			</td>
		</tr>
	);
}

const t_employees = [
	{
		f_Id: "1",
		f_Image: "https://via.placeholder.com/150",
		f_Name: "John Doe",
		f_Email: "john.doe@example.com",
		f_Mobile: "+1234567890",
		f_Designation: "Software Engineer",
		f_Gender: "Male",
		f_Course: "Computer Science",
		f_Createdate: "2024-09-24",
	},
	{
		f_Id: "2",
		f_Image: "https://via.placeholder.com/150",
		f_Name: "Jane Smith",
		f_Email: "jane.smith@example.com",
		f_Mobile: "+0987654321",
		f_Designation: "Product Manager",
		f_Gender: "Female",
		f_Course: "Business Administration",
		f_Createdate: "2024-09-22",
	},
	{
		f_Id: "3",
		f_Image: "https://via.placeholder.com/150",
		f_Name: "Ahmed Khan",
		f_Email: "ahmed.khan@example.com",
		f_Mobile: "+1122334455",
		f_Designation: "Data Analyst",
		f_Gender: "Male",
		f_Course: "Data Science",
		f_Createdate: "2024-09-20",
	},
	{
		f_Id: "4",
		f_Image: "https://via.placeholder.com/150",
		f_Name: "Emily Zhang",
		f_Email: "emily.zhang@example.com",
		f_Mobile: "+6677889900",
		f_Designation: "UI/UX Designer",
		f_Gender: "Female",
		f_Course: "Design",
		f_Createdate: "2024-09-18",
	},
	{
		f_Id: "5",
		f_Image: "https://via.placeholder.com/150",
		f_Name: "Carlos Garcia",
		f_Email: "carlos.garcia@example.com",
		f_Mobile: "+9988776655",
		f_Designation: "Backend Developer",
		f_Gender: "Male",
		f_Course: "Information Technology",
		f_Createdate: "2024-09-15",
	},
];
