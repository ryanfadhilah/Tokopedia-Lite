/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: "lh3.googleusercontent.com" },
            { hostname: "images.unsplash.com" },
            { hostname: "plus.unsplash.com" },
            { hostname: "cdn.shopify.com" },
            { hostname: "epomaker.com" },
            { hostname: "wxalbum-10001658.image.myqcloud.com" },
        ],
    },
    experimental: {
        serverActions: true,
    },
};

module.exports = nextConfig;