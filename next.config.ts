import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Redirect API requests
        destination: "https://canrover-server.vercel.app/api/:path*", // Actual API endpoint
      },
    ];
  },
};

export default nextConfig;
