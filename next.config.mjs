import { withPayload } from '@payloadcms/next/withPayload';

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
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/favicon.ico',
        destination: '/api/payload/media/file/favicon.ico',
      },
    ];
  },
  reactStrictMode: true,
  trailingSlash: true,
};

export default withPayload(nextConfig);
