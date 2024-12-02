/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/blog",
          destination: "https://inblog.ai/jiwon-team",
        },
        {
          source: "/blog/:path*",
          destination: "https://inblog.ai/jiwon-team/:path*",
        },
        {
          source: "/robots.txt",
          destination: "https://inblog.ai/jiwon-team/robots.txt",
        },
        {
          source: "/_inblog/:path*",
          destination: "https://inblog.ai/jiwon-team/_inblog/:path*",
        },
      ],
      afterFiles: [
        {
          source: '/api/platform/:path*',
          destination: `${process.env.API_BASE_URL}/platform/:path*`,
        },
      ],
    };
  },
  compiler: {
    // removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;