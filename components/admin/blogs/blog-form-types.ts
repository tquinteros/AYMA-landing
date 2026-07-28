import type { BlogStatus } from "@/lib/models/Blog";

export interface BlogFormValues {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  coverImageKey: string;
  coverImageAlt: string;
  category: string;
  tags: string[];
  status: BlogStatus;
  publishedAt: string;
  featured: boolean;
  seoMetaTitle: string;
  seoMetaDescription: string;
  seoOgImage: string;
}

export const emptyBlogFormValues: BlogFormValues = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImageUrl: "",
  coverImageKey: "",
  coverImageAlt: "",
  category: "",
  tags: [],
  status: "draft",
  publishedAt: "",
  featured: false,
  seoMetaTitle: "",
  seoMetaDescription: "",
  seoOgImage: "",
};
