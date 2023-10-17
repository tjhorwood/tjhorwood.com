/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'tailwindui.com',
      'images.unsplash.com',
      'cdn.dribbble.com',
      'm.media-amazon.com',
      'ik.imagekit.io',
      'miro.medium.com',
      'store.storeimages.cdn-apple.com',
      'www.apple.com',
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: [
        {
          loader: '@svgr/webpack',
          options: { icon: true, dimensions: false, titleProp: true },
        },
      ],
    });
    return config;
  },
};

module.exports = nextConfig;
