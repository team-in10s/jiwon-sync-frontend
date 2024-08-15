/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/platform/:path*',
        destination: `${process.env.API_BASE_URL}/platform/:path*`,
      },
    ];
  },
};

export default nextConfig;
