/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "resources.smartlayer.network",
      },
    ],
  },
  distDir: "dist",
};

export default nextConfig;
