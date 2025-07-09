/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.tjhorwood.com',
      },
    ],
  },
  reactStrictMode: true,
  output: 'standalone',
  trailingSlash: true,
};

export default {
  ...nextConfig,
};
