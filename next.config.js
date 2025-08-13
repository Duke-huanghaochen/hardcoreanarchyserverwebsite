/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // 配置静态资源目录
  distDir: 'dist',
  // 确保API路由能被正确处理
  experimental: {
    appDir: false,
  },
};

module.exports = nextConfig;