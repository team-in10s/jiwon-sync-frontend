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
  compiler: {
    // removeConsole: process.env.NODE_ENV === 'production',
  },
  reactStrictMode: false,
};

export default nextConfig;
