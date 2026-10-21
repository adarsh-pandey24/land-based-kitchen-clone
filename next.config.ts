import type { NextConfig } from "next";

// Pages from the original template, redirected to their new equivalents.
const oldRoutes: [string, string][] = [
  ["/about-us", "/about"],
  ["/private-chef", "/private-dining-events"],
  ["/private-dining", "/private-dining-events"],
  ["/bespoke-catering", "/party-catering"],
  ["/contact-us", "/contact"],
  ["/private-dining-faqs", "/reviews-faqs"],
  ["/faqs", "/reviews-faqs"],
  ["/reviews", "/reviews-faqs"],
  ["/privacy-policy", "/legal#privacy"],
  ["/terms", "/legal#terms"],
  ["/find-out-more", "/"],
  ["/blog", "/"],
  ["/blog/:slug", "/"],
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return oldRoutes.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
