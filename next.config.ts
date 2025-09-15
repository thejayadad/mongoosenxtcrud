import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Gitpod dev origins to access /_next/* in dev
  allowedDevOrigins: [
    "*.gitpod.io",
    // (optional) narrow it further:
    "*.ws-us121.gitpod.io",
  ],
  experimental: {
    // Allow Server Actions to be invoked from these origins during dev
    serverActions: {
      allowedOrigins: [
        "*.gitpod.io",
        "*.ws-us121.gitpod.io",
      ],
    },
  },
};

export default nextConfig;
