import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=()',
  },
];

const nextConfig = {
  async headers() {
    return [
      {
        headers: securityHeaders,
        source: '/:path*',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        hostname: '*.tjhorwood.com',
        protocol: 'https',
      },
    ],
  },
  output: 'standalone',
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        destination: '/api/payload/media/file/favicon.ico',
        source: '/favicon.ico',
      },
    ];
  },
  trailingSlash: true,
};

export default withPayload(nextConfig);
