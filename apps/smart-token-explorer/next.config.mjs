/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "resources.smartlayer.network",
      },
      {
        protocol: "https",
        hostname: "www.smartlayer.network",
      },
      {
        protocol: "https",
        hostname: "resources.smarttokenlabs.com",
      },
    ],
  },
  distDir: "dist",
};

export default nextConfig;
