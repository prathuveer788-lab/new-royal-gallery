import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/wikipedia/commons/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/heritage", destination: "/culture", permanent: true },
      { source: "/heritage-ai", destination: "/futures", permanent: true },
      { source: "/gallery", destination: "/archive", permanent: true },
    ];
  },
};

export default nextConfig;
