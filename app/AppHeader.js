import Link from "next/link";
export default function AppHeader() {
	return;
	<header className="navbar bg-base-100">
		<div className="flex-1">
			<Link href={"/"} className="link">
				Home
			</Link>
			<a className="btn btn-ghost text-xl">daisyUI</a>
		</div>
		<div className="flex-none">
			<ul className="menu menu-horizontal px-1">
				<li>
					<a>Link</a>
				</li>
				<li>
					<details>
						<summary>Parent</summary>
						<ul className="bg-base-100 rounded-t-none p-2">
							<li>
								<a>Link 1</a>
							</li>
							<li>
								<a>Link 2</a>
							</li>
						</ul>
					</details>
				</li>
			</ul>
		</div>
	</header>;
}
