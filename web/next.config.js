/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	images: {
		domains: ['firebasestorage.googleapis.com'],
	},
	output: 'standalone',
	eslint: {
		ignoreDuringBuilds: true,
	},
	// env: {
	//   SECRET_KEY: process.env.SECRET_KEY,
	// },
};
