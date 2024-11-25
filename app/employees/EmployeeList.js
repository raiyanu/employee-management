"use client";
import Image from "next/image";
import AppHeader from "../components/AppHeader";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import ImageProvider from "./ImageProvider";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import EmployeeTable from "./components/EmployeeTable";
import BreadCrumbs from "../components/BreadCrumbs";

export default function Home({ pageNo }) {
	const router = useRouter();
	const [employees, setEmployees] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	const fetchEmployees = async (pageNo) => {
		setIsLoading(true);
		try {
			const response = await axios.get(`/api/employee/page/${pageNo}`);
			if (response.status === 200 && response.data) {
				setEmployees(response.data);
			} else {
				throw new Error("Invalid response");
			}
		} catch (error) {
			console.error("Error fetching employees:", error);
			alert("Unauthorized access. Redirecting to login page.");
			router.push("/");
		} finally {
			setIsLoading(false);
		}
	};
	useEffect(() => {
		fetchEmployees(meta.activePage);
	}, [pageNo]);

	const meta = {
		activePage: pageNo ? parseInt(pageNo) : 1,
		totalPages: 5,
	};

	return (
		<div>
			<AppHeader />
			<BreadCrumbs
				paths={[
					{ name: "Home", href: "/" },
					{ name: "Employee List", href: "/employees" },
				]}
			/>
			<EmployeeTable employees={employees} meta={meta} />
		</div>
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
