/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'fileshare-v1-bucket.s3.ap-south-1.amazonaws.com',
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.cl1p.in/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
