/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tailwindui.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: '**.apple.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: '**.dribbble.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        port: '',
      },
      {
        protocol: 'https',
        hostname: '**.medium.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'store.storeimages.cdn-apple.com',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
