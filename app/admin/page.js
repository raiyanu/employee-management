import AppHeader from "../components/AppHeader";
import BreadCrumbs from "../components/BreadCrumbs";
import Hero from "../components/Hero";
export default function Home() {
	return (
		<>
			<AppHeader />
			<BreadCrumbs
				paths={[
					{ name: "Home", href: "/", active: true },
				]}
			/>
			<Hero />
		</>
	);
}
