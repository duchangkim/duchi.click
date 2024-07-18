/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  env: {
    BASE_URL:
      process.env.NODE_ENV === 'production' ? 'https://duchi.click' : 'http://localhost:3000',
  },
};

module.exports = nextConfig;
