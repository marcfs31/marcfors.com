import type { NextConfig } from "next";
import { SECURITY_HEADERS } from "./src/lib/securityHeaders";

// Belt-and-braces for the routes that also carry `robots: { index: false }` in
// their metadata: an HTTP header is honoured even when the HTML is never parsed
// (a linked print view, a PDF proxy, a fetch by a naive crawler).
const NOINDEX = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];
const noindexSources = ["/print", "/:locale/print", "/lab/:path*", "/:locale/lab/:path*"];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
      ...noindexSources.map((source) => ({ source, headers: NOINDEX })),
    ];
  },
};

export default nextConfig;
