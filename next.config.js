/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  env: {
    BASE_URL:
      process.env.NODE_ENV === 'production' ? 'https://www.duchi.click' : 'http://localhost:3011',
  },
};

module.exports = nextConfig;
