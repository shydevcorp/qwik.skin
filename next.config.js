const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.skinsmonkey.com"],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(new MiniCssExtractPlugin());
    }
    return config;
  },
};

module.exports = nextConfig;
