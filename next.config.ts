import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'fileshare-v1-bucket.s3.ap-south-1.amazonaws.com',
    ],
  },
  /* config options here */
};

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.cl1p.in/api/:path*', // Proxy to your backend
      },
    ];
  },
};

export default nextConfig;
