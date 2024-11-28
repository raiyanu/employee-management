/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			// {
			// 	source: "/api/:path*",
			// 	destination: "https://employee-management-tt7o.onrender.com/api/:path*",
			// },
		];
	},
};

export default nextConfig;
