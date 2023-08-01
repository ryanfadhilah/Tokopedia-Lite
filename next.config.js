/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    images: {
        remotePatterns: [{ hostname: "images.unplash.com" }]
    },
    experimental: {
        serverActions: true,
    },
}