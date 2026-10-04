import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
let basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

if (!basePath && isGithubActions) {
  const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] || "Vitaminas---Qu-mica";
  basePath = `/${repo}`;
}

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: basePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
