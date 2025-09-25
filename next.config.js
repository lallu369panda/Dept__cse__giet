/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'via.placeholder.com', 'placehold.co', 'cse-dept-website.onrender.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: '*.onrender.com',
      },
    ],
    unoptimized: false,
  },
  // Render.com optimizations
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  // Enable static exports for better performance
  output: 'standalone',
  // Optimize for production
  swcMinify: true,
  // Handle file uploads
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false,
    };
    return config;
  },
}

module.exports = nextConfig
