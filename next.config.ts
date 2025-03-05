import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Redirect API requests
        destination: "http://18.119.37.162:8080/api/:path*", // Actual API endpoint
      },
    ];
  },
};

export default nextConfig;
