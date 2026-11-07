/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep a local design preview separate from another running build.
  distDir: process.env.FITZO_BUILD_DIR || '.next',
  async headers() {
    return [{
      source: '/.well-known/apple-app-site-association',
      headers: [{ key: 'Content-Type', value: 'application/json' }],
    }];
  },
};

export default nextConfig;
