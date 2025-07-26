// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/assets/',
          outputPath: 'static/assets/',
        },
      },
    });
    return config;
  },
  experimental: {
    esmExternals: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Add for Vercel deployment
  transpilePackages: ['three', 'gsap', 'framer-motion'],
};

module.exports = nextConfig;