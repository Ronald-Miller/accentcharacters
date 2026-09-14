import type { MetadataRoute } from "next";
import { ALL_LETTERS } from "@/lib/letters";
import { letterUrl, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${site.url}/alt-codes`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${site.url}/about`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${site.url}/author/adrian-voss`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    ...ALL_LETTERS.map((l) => ({
      url: `${site.url}${letterUrl(l)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
