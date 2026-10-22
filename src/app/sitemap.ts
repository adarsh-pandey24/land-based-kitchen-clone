import type { MetadataRoute } from "next";
import { nav, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...new Set([...nav.flatMap((n) => [n.href, ...(n.children ?? []).map((c) => c.href)]), "/legal"])];
  return paths.map((path) => ({ url: `${siteUrl}${path === "/" ? "" : path}` }));
}
