"use client";
// app/employees/[pageNo]/page.js
import { useParams } from "next/navigation";

import EmployeeList from "../EmployeeList";

export default function PaginatedEmployees() {
	const { pageNo } = useParams();

	return <EmployeeList pageNo={pageNo} />;
}
