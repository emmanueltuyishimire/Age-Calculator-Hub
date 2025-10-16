
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/sitemap',
      },
      {
        source: '/robots.txt',
        destination: '/api/robots',
      }
    ];
  },
  // This is required to allow the Next.js dev server to accept requests from the
  // Firebase Studio preview environment.
  // allowedDevOrigins was moved out of experimental for newer Next.js versions,
  // but it seems to be causing issues with Turbopack. Temporarily removing it.
  // The Partytown feature was removed in Next.js 14. The 'worker' strategy on next/script is used instead.
  experimental: { },
};

export default nextConfig;
