/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: {
        loader: "file-loader",
        options: {
          publicPath: "/_next/static/",
          outputPath: "static/",
        },
      },
    });
    return config;
  },
  experimental: {
    turbo: {
      rules: {
        "*.tsx": {
          loaders: ["typescript"],
          options: {
            strictNullChecks: true,
            noImplicitAny: true,
          },
        },
        "*.ts": {
          loaders: ["typescript"],
          options: {
            strictNullChecks: true,
            noImplicitAny: true,
          },
        },
      },
      resolveExtensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },
  },
  async headers() {
    return [
      {
        source: "/landing/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/api/auth/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "Set-Cookie",
            value: "SameSite=None; Secure; Path=/",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "/api/:path*",
      },
    ];
  },
  reactStrictMode: true,
  output: "standalone",
};

module.exports = nextConfig;
