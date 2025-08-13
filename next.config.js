/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // 配置静态资源目录
  distDir: 'dist'
};

module.exports = nextConfig;