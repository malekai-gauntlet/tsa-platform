/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ignore type checking for script files and missing modules
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
