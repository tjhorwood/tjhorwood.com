/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Ensures static HTML is generated
  trailingSlash: true, // Optional: Adds trailing slashes to URLs for better Netlify compatibility
  images: { unoptimized: true }, // Optional: Optimizes images
};

module.exports = nextConfig;
