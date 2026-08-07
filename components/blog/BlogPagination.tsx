import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogPaginationProps {
  page: number;
  totalPages: number;
  category?: string;
  tag?: string;
}

function buildHref(page: number, category?: string, tag?: string) {
  const search = new URLSearchParams();
  if (page > 1) search.set("page", String(page));
  if (category) search.set("category", category);
  if (tag) search.set("tag", tag);
  const query = search.toString();
  return query ? `/journals?${query}` : "/journals";
}

export function BlogPagination({ page, totalPages, category, tag }: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center gap-1.5 pt-4">
      <Link
        href={buildHref(Math.max(1, page - 1), category, tag)}
        scroll={false}
        aria-disabled={page === 1}
        className={cn(
          "flex size-9 items-center justify-center rounded-full border border-primary-900/20 text-primary-900/70 transition-colors hover:border-primary-500",
          page === 1 && "pointer-events-none opacity-40"
        )}
      >
        <ChevronLeft className="size-4" />
      </Link>

      {pages.map((p) => (
        <Link
          key={p}
          href={buildHref(p, category, tag)}
          scroll={false}
          className={cn(
            "flex size-9 items-center justify-center rounded-full text-sm transition-colors",
            p === page
              ? "bg-primary-500 text-background-100"
              : "text-primary-900/70 hover:bg-background-900/60"
          )}
        >
          {p}
        </Link>
      ))}

      <Link
        href={buildHref(Math.min(totalPages, page + 1), category, tag)}
        scroll={false}
        aria-disabled={page === totalPages}
        className={cn(
          "flex size-9 items-center justify-center rounded-full border border-primary-900/20 text-primary-900/70 transition-colors hover:border-primary-500",
          page === totalPages && "pointer-events-none opacity-40"
        )}
      >
        <ChevronRight className="size-4" />
      </Link>
    </nav>
  );
}
