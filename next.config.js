/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use static export only when explicitly set for GitHub Pages
  ...(process.env.GITHUB_PAGES === 'true' ? {
    output: 'export',
    trailingSlash: true,
    basePath: '/Dept__cse__giet',
    assetPrefix: '/Dept__cse__giet/',
  } : {}),
  images: {
    domains: ['localhost'],
    unoptimized: process.env.GITHUB_PAGES === 'true',
  },
}

module.exports = nextConfig
