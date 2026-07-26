import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Keep metadata in <head> for Lighthouse / all UAs (avoids streaming into <body>).
  htmlLimitedBots: /.*/,
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },
  experimental: {
    optimizePackageImports: ["clsx", "tailwind-merge"],
    optimizeCss: true,
    viewTransition: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Permissions-Policy",
            value: "unload=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
