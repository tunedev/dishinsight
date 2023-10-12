/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/swissdevchi/image/upload/**",
      },
    ],
  },
};

module.exports = nextConfig;
