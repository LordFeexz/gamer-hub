import type { NextConfig } from "next";
import { resolve } from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  pageExtensions: ["js", "jsx", "mdx", "md", "ts", "tsx"],
  compiler: {
    reactRemoveProperties: { properties: ["renderNode"] },
  },
  env: {
    GOOGLE_OAUTH_CLIENTID: process.env.GOOGLE_OAUTH_CLIENTID,
    GOOGLE_OAUTH_CLIENTSECRET: process.env.GOOGLE_OAUTH_CLIENTSECRET,
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    DOMAIN: process.env.DOMAIN,
  },
};

export default nextConfig;
