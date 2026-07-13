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
  reactStrictMode: true,
  trailingSlash: true,
};

export default withPayload(nextConfig);
