/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: "https://localhost:5959/api/:path*",
			},
		];
	},
};

export default nextConfig;
