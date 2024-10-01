/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Ignores TypeScript build errors
  },
  eslint: {
    ignoreDuringBuilds: true, // Skips ESLint during production builds
  },
};

export default nextConfig;
