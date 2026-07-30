import Image from "next/image";
import Link from "next/link";
import type { BlogData } from "@/lib/actions/blog";

interface BlogCardProps {
  blog: BlogData;
  variant?: "grid" | "list";
}

function formatDate(date?: string) {
  if (!date) return "";
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function BlogCard({ blog, variant = "grid" }: BlogCardProps) {
  const isList = variant === "list";

  return (
    <Link
      href={`/journals/${blog.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-background-500 text-roca-100 ring-1 ring-primary-900/10 transition-shadow hover:shadow-lg"
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

      <div
        className={`flex flex-1 flex-col gap-3 ${isList ? "p-4" : "p-5"}`}
      >
        <h3
          className={`font-medium leading-snug text-roca-500 line-clamp-1 ${
            isList ? "text-base" : "text-[18px]"
          }`}
        >
          {blog.title}asd
        </h3>
        <p
          className={`flex-1 text-roca-500 ${
            isList ? "text-xs line-clamp-2" : "text-sm line-clamp-3"
          }`}
        >
          {blog.excerpt}
        </p>
        <div
          className={`flex items-center justify-between pt-2 text-surface-900 ${
            isList ? "text-[11px]" : "text-xs"
          }`}
        >
          <span>{formatDate(blog.publishedAt)}</span>
          <span>{blog.readingTimeMinutes} min de lectura</span>
        </div>
      </div>
    </Link>
  );
}
