import type { Metadata } from "next";
import {
  getPublishedBlogs,
  getBlogCategories,
  getBlogTags,
} from "@/lib/actions/blog";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogFilters } from "@/components/blog/BlogFilters";
import { BlogPagination } from "@/components/blog/BlogPagination";
import HeroBlog from "@/components/blog/HeroBlog";

const PAGE_SIZE = 9;

export const metadata: Metadata = {
  title: "Journals | AYMA Wellness Club",
  description:
    "Artículos sobre bienestar, longevidad y estilo de vida para acompañarte en tu revolución del bienestar.",
  openGraph: {
    title: "Journals | AYMA Wellness Club",
    description:
      "Artículos sobre bienestar, longevidad y estilo de vida para acompañarte en tu revolución del bienestar.",
    type: "website",
  },
};

interface BlogPageProps {
  searchParams: Promise<{ page?: string; category?: string; tag?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const category = params.category || undefined;
  const tag = params.tag || undefined;

  const [{ blogs, totalPages }, categories, tags] = await Promise.all([
    getPublishedBlogs({ page, pageSize: PAGE_SIZE, category, tag }),
    getBlogCategories(),
    getBlogTags(),
  ]);

  return (
    <div className="bg-roca-500">
      <HeroBlog />

      <div className="px-5 pb-24 pt-12 sm:px-8 lg:px-24">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10">
          <BlogFilters
            categories={categories}
            tags={tags}
            activeCategory={category}
            activeTag={tag}
          />

          {blogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-primary-900/20 py-24 text-center">
              <p className="text-primary-900/60">
                Todavía no hay artículos publicados{tag || category ? " con este filtro" : ""}.
              </p>
            </div>
          ) : (
            <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3">
              {blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          )}

          <BlogPagination page={page} totalPages={totalPages} category={category} tag={tag} />
        </div>
      </div>
    </div>
  );
}
