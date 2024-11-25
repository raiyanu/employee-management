"use client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

async function getCookie(cookieName) {
	// Get all cookies
	const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
		const [name, value] = cookie.split("=");
		acc[name] = decodeURIComponent(value);
		return acc;
	}, {});

	// Get the specified cookie and parse it as JSON
	const cookieValue = cookies[cookieName];
	if (cookieValue) {
		try {
			console.log("cookieValue:", cookieValue);
			console.log("cookieJSON:", await JSON.parse(cookieValue));
			return JSON.parse(cookieValue);
		} catch (error) {
			console.error(`Error parsing cookie "${cookieName}":`, error);
			return null; // or handle error as needed
		}
	}

	return null; // Return null if the cookie doesn't exist
}

export default function Home() {
	const [user, setUser] = useState({ isLogged: false });
	const verify = async () => {
		try {
			setUser(
				(await getCookie("user"))
					? await getCookie("user")
					: { isLogged: false }
			);
		} catch (error) {
			alert(error.message);
			console.error(error);
		}
		console.log("user:", user);
	};
	useEffect(() => {
		verify();
	}, []);
	return user.isLogged ? redirect("/admin") : <Login />;
}

export function Login() {
	return (
		<>

			<div className="max-w-full px-4  flex flex-col items-center justify-center  h-screen ">
				<form
					className="container max-w-xs *:mt-2 "
					action="/api/users/auth"
					method="POST"
				>
					<label className="input input-bordered flex items-center gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 16 16"
							fill="currentColor"
							className="h-4 w-4 opacity-70"
						>
							<path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
						</svg>

						<input
							type="text"
							className="grow"
							name="username"
							placeholder="Username"
						/>
					</label>
					<label className="input input-bordered flex items-center gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 16 16"
							fill="currentColor"
							className="h-4 w-4 opacity-70"
						>
							<path
								fillRule="evenodd"
								d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
								clipRule="evenodd"
							/>
						</svg>{" "}
						<input
							type="password"
							className="grow"
							placeholder="Password"
							name="password"
						/>
					</label>
					<button className="btn btn-primary w-full">Login</button>
				</form>
			</div>
		</>
	);
}
