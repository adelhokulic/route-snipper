/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  agentRules: false,
  experimental: {
    agentFeedback: false,
  },
  reactCompiler: true,
};

export default nextConfig;
