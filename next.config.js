/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    uploadPreset: "v97lcuvz",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
}

module.exports = nextConfig
