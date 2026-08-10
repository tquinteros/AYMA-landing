import type { Metadata } from "next";
import Image from "next/image";
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
    return { title: "Journal no encontrado | AYMA" };
  }

  const title = blog.seo?.metaTitle || `${blog.title} | AYMA Wellness Club`;
  const description = blog.seo?.metaDescription || blog.excerpt;
  const ogImage = blog.seo?.ogImage || blog.coverImage.url;
  const url = absoluteUrl(`/journal/${blog.slug}`);

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
    mainEntityOfPage: absoluteUrl(`/journal/${blog.slug}`),
  };

  return (
    <article className="min-h-screen bg-roca-500 pb-24 pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="px-5 sm:px-8 lg:px-24">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-6">
          <div className="flex flex-col gap-6 lg:col-span-8">
            <BlogBreadcrumb title={blog.title} />

            {blog.category && (
              <span className="w-fit rounded-full bg-primary-500 px-4 py-2 text-xs uppercase tracking-wide text-background-100">
                {blog.category}
              </span>
            )}

            <h1 className="text-3xl leading-tight text-background-100 sm:text-[40px]">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-base text-background-100/70">
              <span className="font-medium text-background-100">{blog.author.name}</span>
              <span aria-hidden className="text-background-100">·</span>
              <span className="text-background-100">{formatDate(blog.publishedAt)}</span>
              <span aria-hidden className="text-background-100">·</span>
              <span className="text-background-100">{blog.readingTimeMinutes} min de lectura</span>
            </div>
          </div>

          {/* Image + content share one cell so the related sidebar can't stretch the cover row */}
          <div className="order-1 flex flex-col gap-6 lg:order-none lg:col-span-8">
            <div className="relative h-[200px] w-full overflow-hidden rounded-2xl bg-background-900 sm:h-[260px] lg:h-[360px]">
              <Image
                src={blog.coverImage.url}
                alt={blog.coverImage.alt || blog.title}
                fill
                unoptimized
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
              />
            </div>

            <BlogContent html={blog.content} />

            {blog.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2 border-t border-background-100/10 pt-6">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#E0D5CD] px-3 py-1.5 text-xs text-roca-500"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <aside className="order-2 lg:order-none lg:col-span-4 lg:col-start-9 lg:row-start-2 lg:self-start">
            <RelatedBlogs blogs={relatedBlogs} />
          </aside>
        </div>
      </div>
    </article>
  );
}
