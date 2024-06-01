import "./src/lib/env.mjs"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "karumariamman.ca",
        port: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
    ],
    // domains: [
    //   "avatars.githubusercontent.com",
    //   "lh3.googleusercontent.com",
    //   "karumariamman.ca",
    // ],
  },
}

export default nextConfig
