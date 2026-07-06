import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// Cloudflare Pages sets CF_PAGES=1 during CI builds and expects static output in /out
const isCloudflarePages = process.env.CF_PAGES === "1";

const nextConfig: NextConfig = {
  ...(isCloudflarePages ? { output: "export" as const } : {}),
  images: {
    unoptimized: isCloudflarePages,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;

initOpenNextCloudflareForDev();
