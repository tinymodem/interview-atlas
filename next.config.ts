import type { NextConfig } from 'next';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true' || process.env.GITHUB_PAGES === 'true';
const repoName = 'interview-atlas';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isGitHubPages ? `/${repoName}` : '',
  assetPrefix: isGitHubPages ? `/${repoName}/` : undefined,
  outputFileTracingRoot: __dirname,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
