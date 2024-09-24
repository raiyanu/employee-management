import Link from "next/link";
export default function AppHeader() {
	return (
		<header className="navbar bg-base-100">
			<div className="flex-1">
				<Link href={"/"} className="btn btn-ghost text-xl">
					Home
				</Link>
			</div>
			<div>
				<Link href={"/add"} className="btn btn-secondary btn-sm">
					Add
				</Link>
			</div>
			<div className="flex-none">
				<ul className="menu menu-horizontal px-1 gap-4">
					<li>
						<Link href={"/employees"}>Employee list </Link>
					</li>
					<li>
						<Link href={"/"} className="btn btn-error btn-sm">
							Logout
						</Link>
					</li>
				</ul>
			</div>
		</header>
	);
}
