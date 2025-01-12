import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
