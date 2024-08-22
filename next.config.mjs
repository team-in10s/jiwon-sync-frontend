/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/platform/:path/status',
        destination: `${process.env.API_BASE_URL}/platform/:path/status`,
      },
    ];
  },
};

export default nextConfig;
