import withSerwist from "@serwist/next";

const nextConfig = withSerwist({
  swSrc: "src/sw.ts",
  swDest: "public/sw.js",
  cacheOnNavigation: true,
})({
  reactStrictMode: true,
  turbopack: {},
});

export default nextConfig;
