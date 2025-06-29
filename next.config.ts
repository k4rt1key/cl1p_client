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
        destination: 'http://localhost:5000/api/:path*', // Proxy to your backend
      },
    ];
  },
};

export default nextConfig;
