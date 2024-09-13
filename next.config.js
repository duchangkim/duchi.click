import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  env: {
    BASE_URL:
      process.env.NODE_ENV === 'production' ? 'https://duchi.click' : 'http://localhost:3011',
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX();

export default withMDX(nextConfig);
