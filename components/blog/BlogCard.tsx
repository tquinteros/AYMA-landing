import Image from "next/image";
import Link from "next/link";
import type { BlogData } from "@/lib/actions/blog";

interface BlogCardProps {
  blog: BlogData;
}

function formatDate(date?: string) {
  if (!date) return "";
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-background-100 ring-1 ring-primary-900/10 transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-background-900">
        <Image
          src={blog.coverImage.url}
          alt={blog.coverImage.alt || blog.title}
          fill
          unoptimized
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {blog.category && (
          <span className="absolute left-3 top-3 rounded-full bg-primary-500/90 px-3 py-1 text-xs uppercase tracking-wide text-background-100">
            {blog.category}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-xl font-medium leading-snug text-roca-500 line-clamp-2">
          {blog.title}
        </h3>
        <p className="flex-1 text-sm text-primary-900/70 line-clamp-3">
          {blog.excerpt}
        </p>
        <div className="flex items-center justify-between pt-2 text-xs text-primary-900/60">
          <span>{formatDate(blog.publishedAt)}</span>
          <span>{blog.readingTimeMinutes} min de lectura</span>
        </div>
      </div>
    </Link>
  );
}
