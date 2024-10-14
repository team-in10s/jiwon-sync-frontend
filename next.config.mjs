import { withHighlightConfig } from '@highlight-run/next/config';

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
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    instrumentationHook: true,
    // serverComponentsExternalPackages: ['@highlight-run/node'], // highlight에서 API route instrumentation 적용할때 사용: https://www.highlight.io/docs/getting-started/fullstack-frameworks/next-js/app-router#api-route-instrumentation
  },
  webpack(config, options) {
    if (options.isServer) {
      config.ignoreWarnings = [{ module: /highlight-(run\/)?node/ }];
    }

    return config;
  },
};

export default withHighlightConfig(nextConfig);
