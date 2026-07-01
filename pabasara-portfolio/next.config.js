/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  output: "export", // for static deploy to GitHub Pages / Vercel
};

module.exports = nextConfig;
