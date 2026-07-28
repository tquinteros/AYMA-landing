import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogBySlug, getRelatedBlogs } from "@/lib/actions/blog";
import { BlogBreadcrumb } from "@/components/blog/BlogBreadcrumb";
import { BlogContent } from "@/components/blog/BlogContent";
import { RelatedBlogs } from "@/components/blog/RelatedBlogs";
import { absoluteUrl } from "@/lib/site-config";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

function formatDate(date?: string) {
  if (!date) return "";
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return { title: "Blog no encontrado | AYMA" };
  }

  const title = blog.seo?.metaTitle || `${blog.title} | AYMA Wellness Club`;
  const description = blog.seo?.metaDescription || blog.excerpt;
  const ogImage = blog.seo?.ogImage || blog.coverImage.url;
  const url = absoluteUrl(`/blog/${blog.slug}`);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: blog.publishedAt,
      authors: [blog.author.name],
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) notFound();

  const relatedBlogs = await getRelatedBlogs(blog.category, blog._id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt,
    image: blog.seo?.ogImage || blog.coverImage.url,
    datePublished: blog.publishedAt,
    dateModified: blog.updatedAt,
    author: {
      "@type": "Person",
      name: blog.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "AYMA Wellness Club",
    },
    mainEntityOfPage: absoluteUrl(`/blog/${blog.slug}`),
  };

  return (
    <article className="pb-24 pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-5 sm:px-8 lg:px-0">
        <BlogBreadcrumb title={blog.title} />

        {blog.category && (
          <Link
            href={`/blog?category=${encodeURIComponent(blog.category)}`}
            className="w-fit rounded-full bg-primary-500/10 px-3.5 py-1.5 text-xs uppercase tracking-wide text-primary-500"
          >
            {blog.category}
          </Link>
        )}

        <h1 className="text-3xl font-medium leading-tight text-roca-500 sm:text-5xl">
          {blog.title}
        </h1>

        <div className="flex flex-wrap items-center gap-3 text-sm text-primary-900/60">
          <span className="font-medium text-roca-500">{blog.author.name}</span>
          <span aria-hidden>·</span>
          <span>{formatDate(blog.publishedAt)}</span>
          <span aria-hidden>·</span>
          <span>{blog.readingTimeMinutes} min de lectura</span>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-5xl px-5 sm:px-8 lg:px-0">
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-background-900">
          <Image
            src={blog.coverImage.url}
            alt={blog.coverImage.alt || blog.title}
            fill
            unoptimized
            priority
            className="object-cover"
          />
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-3xl px-5 sm:px-8 lg:px-0">
        <BlogContent html={blog.content} />

        {blog.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2 border-t border-primary-900/10 pt-6">
            {blog.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="rounded-full bg-background-900/60 px-3 py-1 text-xs text-primary-900/70 hover:bg-background-900"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="px-5 sm:px-8 lg:px-0">
        <RelatedBlogs blogs={relatedBlogs} />
      </div>
    </article>
  );
}
