"use client";
import Link from "next/link";
import ImageProvider from "../ImageProvider";
import { useRouter } from "next/navigation";
import axios from "axios";
export default function EmployeeTable({ meta, employees }) {
	const router = useRouter();
	const renderButtons = () => {
		const current = meta.activePage;
		const totalPage = employees.pages ? employees.pages : 1;
		const buttons = [];
		let startPage = Math.max(1, current - 2);
		let endPage = Math.min(totalPage, current + 2);

		if (current <= 3) {
			endPage = Math.min(totalPage, 6);
		} else if (current >= totalPage - 2) {
			startPage = Math.max(1, totalPage - 6);
		}
		buttons.push(
			<Link
				key={"<<"}
				className={`join-item btn btn-sm ${1 === current ? "hidden" : ""
					}`}
				href={`/employees/${1}`}
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevrons-left"><path d="m11 17-5-5 5-5" /><path d="m18 17-5-5 5-5" /></svg>
			</Link>
		);
		for (let i = startPage; i <= endPage; i++) {
			buttons.push(
				<Link
					key={i}
					className={`join-item btn btn-sm ${i === current ? "btn-active" : ""
						}`}
					href={`/employees/${i}`}
				>
					{i}
				</Link>
			);
		}
		buttons.push(
			<Link
				key={">>"}
				className={`join-item btn btn-sm ${totalPage === current ? "hidden" : ""
					}`}
				href={`/employees/${totalPage}`}
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevrons-right"><path d="m6 17 5-5-5-5" /><path d="m13 17 5-5-5-5" /></svg>
			</Link>
		);
		return buttons;
	};

	return (
		<div className="overflow-x-auto">
			{employees.employees ? (
				<>
					<table className="table">
						{/* head */}
						<thead>
							<tr className="*:cursor-pointer *:font-bold group-hover:font-black">
								<th>UUID</th>
								<th>Image</th>
								<th>Name</th>
								<th>Email</th>
								<th>Mobile No.</th>
								<th>Designation</th>
								<th>Gender</th>
								<th>Course</th>
								<th>Address</th>
								<th>Created date</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{employees.employees ? (
								employees.employees.map((employee) => (
									<EmployeeTuple
										key={employee.f_Id}
										employee={employee}
										router={router}
									/>
								))
							) : (
								<p className="text-center py-6 font-extrabold text-5xl">
									Loading...
								</p>
							)}
						</tbody>
					</table>
					<div className="join flex items-center justify-center py-2">
						{renderButtons()}
					</div>
				</>
			) : (
				<span className="loading loading-bars loading-lg block mx-auto mt-8"></span>
				// <p className="text-center py-6 font-extrabold text-5xl">Loading...</p>
			)}
		</div>
	);
}

export function EmployeeTuple({ employee, router }) {
	async function deleteEmployee(f_Id) {
		try {
			const response = await axios.delete(`/api/employee/${f_Id}`);
			if (response.status === 200) {
				alert("Employee deleted successfully");
				window.location.reload();
			}
		} catch (error) {
			console.error("Error deleting employee:", error);
		}
	}
	function editEmployee(f_Id) {
		router.push(`/employees/edit/${f_Id}`);
	}
	return (
		<tr className="hover:bg-[rgba(0,0,0,.075)]  transition-colors" >
			<td> {employee.f_Id} </td>
			<td>
				<div className="flex items-center gap-3">
					<div className="avatar">
						<div className="mask mask-squircle h-12 w-12">
							<ImageProvider imageData={employee.f_Image} />
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
			<td>{employee.f_Address}</td>

			<td>{new Date(employee.f_Createdate).toLocaleString()}</td>
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
