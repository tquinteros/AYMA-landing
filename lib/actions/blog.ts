"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { BlogModel, type BlogStatus } from "@/lib/models/Blog";
import { getSession } from "@/lib/auth";
import { deleteImage } from "@/lib/actions/upload";
import { slugify } from "@/lib/utils/slugify";
import { calculateReadingTime } from "@/lib/utils/reading-time";

async function requireAdmin() {
  const session = await getSession();
  if (!session) throw new Error("No autorizado.");
}

export interface BlogData {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: { url: string; key?: string; alt?: string };
  category?: string;
  tags: string[];
  author: { name: string };
  status: BlogStatus;
  publishedAt?: string;
  readingTimeMinutes: number;
  featured: boolean;
  seo: { metaTitle?: string; metaDescription?: string; ogImage?: string };
  views: number;
  createdAt: string;
  updatedAt: string;
}

const DEFAULT_AUTHOR_NAME = "Equipo AYMA";

export interface PaginatedBlogs {
  blogs: BlogData[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

function serialize<T>(doc: unknown): T {
  return JSON.parse(JSON.stringify(doc));
}

function publicVisibilityFilter(now: Date = new Date()) {
  return {
    $or: [
      { status: "published" },
      { status: "scheduled", publishedAt: { $lte: now } },
    ],
  };
}

async function generateUniqueSlug(title: string, ignoreId?: string): Promise<string> {
  const base = slugify(title) || "post";
  let candidate = base;
  let suffix = 1;

  while (true) {
    const existing = await BlogModel.findOne({
      slug: candidate,
      ...(ignoreId ? { _id: { $ne: ignoreId } } : {}),
    }).lean();
    if (!existing) return candidate;
    suffix += 1;
    candidate = `${base}-${suffix}`;
  }
}

export async function getBlogs(): Promise<BlogData[]> {
  await connectDB();
  const blogs = await BlogModel.find().sort({ createdAt: -1 }).lean();
  return serialize(blogs);
}

export async function getPublishedBlogs({
  page = 1,
  pageSize = 9,
  category,
  tag,
}: {
  page?: number;
  pageSize?: number;
  category?: string;
  tag?: string;
} = {}): Promise<PaginatedBlogs> {
  await connectDB();

  const filter: Record<string, unknown> = { ...publicVisibilityFilter() };
  if (category) filter.category = category;
  if (tag) filter.tags = tag;

  const skip = (page - 1) * pageSize;

  const [blogs, total] = await Promise.all([
    BlogModel.find(filter)
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(pageSize)
      .lean(),
    BlogModel.countDocuments(filter),
  ]);

  return {
    blogs: serialize(blogs),
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

export async function getFeaturedBlogs(limit = 3): Promise<BlogData[]> {
  await connectDB();
  const blogs = await BlogModel.find({ ...publicVisibilityFilter(), featured: true })
    .sort({ publishedAt: -1, createdAt: -1 })
    .limit(limit)
    .lean();
  return serialize(blogs);
}

export async function getBlogBySlug(slug: string): Promise<BlogData | null> {
  await connectDB();
  const blog = await BlogModel.findOne({ slug, ...publicVisibilityFilter() }).lean();
  return blog ? serialize(blog) : null;
}

export async function getRelatedBlogs(
  category: string | undefined,
  excludeId: string,
  limit = 3
): Promise<BlogData[]> {
  await connectDB();
  if (!category) return [];
  const blogs = await BlogModel.find({
    ...publicVisibilityFilter(),
    category,
    _id: { $ne: excludeId },
  })
    .sort({ publishedAt: -1, createdAt: -1 })
    .limit(limit)
    .lean();
  return serialize(blogs);
}

export async function getBlogCategories(): Promise<string[]> {
  await connectDB();
  const categories = await BlogModel.distinct("category", {
    ...publicVisibilityFilter(),
    category: { $nin: [null, ""] },
  });
  return categories.sort();
}

export async function getBlogTags(): Promise<string[]> {
  await connectDB();
  const tags = await BlogModel.distinct("tags", publicVisibilityFilter());
  return tags.sort();
}

function parseTags(raw: string | null): string[] {
  if (!raw) return [];
  return raw
    .split("\n")
    .map((t) => t.trim())
    .filter(Boolean);
}

function buildSeoFromForm(formData: FormData) {
  return {
    metaTitle: (formData.get("seoMetaTitle") as string) || undefined,
    metaDescription: (formData.get("seoMetaDescription") as string) || undefined,
    ogImage: (formData.get("seoOgImage") as string) || undefined,
  };
}

export async function createBlog(_prevState: unknown, formData: FormData) {
  try {
    await requireAdmin();
    await connectDB();

    const title = formData.get("title") as string;
    const slugInput = (formData.get("slug") as string) || "";
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const coverImageUrl = formData.get("coverImageUrl") as string;
    const coverImageKey = (formData.get("coverImageKey") as string) || undefined;
    const coverImageAlt = (formData.get("coverImageAlt") as string) || undefined;
    const category = (formData.get("category") as string) || undefined;
    const tags = parseTags(formData.get("tags") as string);
    const status = (formData.get("status") as BlogStatus) || "draft";
    const publishedAtRaw = formData.get("publishedAt") as string | null;
    const featured = formData.get("featured") === "true";

    if (!title || !excerpt || !content || !coverImageUrl) {
      return { error: "Completá todos los campos obligatorios." };
    }

    if (status === "scheduled" && !publishedAtRaw) {
      return { error: "Elegí una fecha de publicación para el estado programado." };
    }

    const finalSlug = await generateUniqueSlug(slugInput || title);

    const publishedAt =
      status === "draft"
        ? undefined
        : publishedAtRaw
        ? new Date(publishedAtRaw)
        : new Date();

    await BlogModel.create({
      title,
      slug: finalSlug,
      excerpt,
      content,
      coverImage: { url: coverImageUrl, key: coverImageKey, alt: coverImageAlt },
      category,
      tags,
      author: { name: DEFAULT_AUTHOR_NAME },
      status,
      publishedAt,
      readingTimeMinutes: calculateReadingTime(content),
      featured,
      seo: buildSeoFromForm(formData),
    });

    revalidatePath("/admin/blogs");
    revalidatePath("/blog");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Error al crear el blog." };
  }
}

export async function updateBlog(_prevState: unknown, formData: FormData) {
  try {
    await requireAdmin();
    await connectDB();

    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const slugInput = (formData.get("slug") as string) || "";
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const coverImageUrl = formData.get("coverImageUrl") as string;
    const coverImageKey = (formData.get("coverImageKey") as string) || undefined;
    const coverImageAlt = (formData.get("coverImageAlt") as string) || undefined;
    const previousCoverImageKey = (formData.get("previousCoverImageKey") as string) || undefined;
    const category = (formData.get("category") as string) || undefined;
    const tags = parseTags(formData.get("tags") as string);
    const status = (formData.get("status") as BlogStatus) || "draft";
    const publishedAtRaw = formData.get("publishedAt") as string | null;
    const featured = formData.get("featured") === "true";

    if (!id || !title || !excerpt || !content || !coverImageUrl) {
      return { error: "Completá todos los campos obligatorios." };
    }

    if (status === "scheduled" && !publishedAtRaw) {
      return { error: "Elegí una fecha de publicación para el estado programado." };
    }

    const existing = await BlogModel.findById(id).lean();
    if (!existing) {
      return { error: "El blog no existe." };
    }

    let finalSlug = existing.slug;
    if (slugInput && slugify(slugInput) !== existing.slug) {
      finalSlug = await generateUniqueSlug(slugify(slugInput), id);
    }

    const publishedAt =
      status === "draft"
        ? undefined
        : publishedAtRaw
        ? new Date(publishedAtRaw)
        : existing.publishedAt ?? new Date();

    await BlogModel.findByIdAndUpdate(id, {
      $set: {
        title,
        slug: finalSlug,
        excerpt,
        content,
        coverImage: { url: coverImageUrl, key: coverImageKey, alt: coverImageAlt },
        category,
        tags,
        author: { name: existing.author?.name || DEFAULT_AUTHOR_NAME },
        status,
        publishedAt,
        readingTimeMinutes: calculateReadingTime(content),
        featured,
        seo: buildSeoFromForm(formData),
      },
    });

    if (previousCoverImageKey && previousCoverImageKey !== coverImageKey) {
      await deleteImage(previousCoverImageKey);
    }

    revalidatePath("/admin/blogs");
    revalidatePath("/blog");
    revalidatePath(`/blog/${existing.slug}`);
    if (finalSlug !== existing.slug) revalidatePath(`/blog/${finalSlug}`);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Error al actualizar el blog." };
  }
}

export async function deleteBlog(id: string) {
  try {
    await requireAdmin();
    await connectDB();

    const blog = await BlogModel.findByIdAndDelete(id).lean();
    if (blog?.coverImage?.key) {
      await deleteImage(blog.coverImage.key);
    }

    revalidatePath("/admin/blogs");
    revalidatePath("/blog");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Error al eliminar el blog." };
  }
}
