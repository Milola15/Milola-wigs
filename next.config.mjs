/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
    ],
  },
  outputFileTracingIncludes: {
    '/produits/[id]': ['./src/generated/prisma/**/*'],
    '/collections': ['./src/generated/prisma/**/*'],
  },
};

export default nextConfig;