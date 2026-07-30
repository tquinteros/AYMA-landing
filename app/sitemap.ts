import type { MetadataRoute } from "next";
import { getPublishedBlogs } from "@/lib/actions/blog";
import { SITE_URL } from "@/lib/site-config";

const STATIC_ROUTES = [
  "",
  "/services",
  "/longevity",
  "/memberships",
  "/contact",
  "/journals",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { blogs } = await getPublishedBlogs({ page: 1, pageSize: 1000 });

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));

  const blogEntries: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${SITE_URL}/journals/${blog.slug}`,
    lastModified: new Date(blog.updatedAt),
  }));

  return [...staticEntries, ...blogEntries];
}
