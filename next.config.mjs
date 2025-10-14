/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  // Uncomment the two blocks below ONLY if you run lint & typecheck in separate steps:
  // eslint: { ignoreDuringBuilds: true },
  // typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
